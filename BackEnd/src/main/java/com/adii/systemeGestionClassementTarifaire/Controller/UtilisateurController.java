package com.adii.systemeGestionClassementTarifaire.Controller;

import com.adii.systemeGestionClassementTarifaire.config.JwtService;
import com.adii.systemeGestionClassementTarifaire.model.Utilisateur;
import com.adii.systemeGestionClassementTarifaire.repository.UtilisateurRepository;
import com.adii.systemeGestionClassementTarifaire.request.LoginRequest;
import com.adii.systemeGestionClassementTarifaire.model.Fonctionnalite;
import com.adii.systemeGestionClassementTarifaire.response.AuthResponse;
import com.adii.systemeGestionClassementTarifaire.service.UserDetailService;
import com.adii.systemeGestionClassementTarifaire.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/utilisateur")
public class UtilisateurController {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserDetailService userDetailService;
    @Autowired
    private UtilisateurService utilisateurService;
    @Autowired
    private UtilisateurRepository utilisateurRepository;


    //signin method
    @PostMapping("/authentification")
    public ResponseEntity<AuthResponse> signin (@RequestBody LoginRequest loginRequest){

        String email = loginRequest.getEmail();
        String password = loginRequest.getMotDePasse();

        Authentication authentication = authenticate(email, password);

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        // If multiple roles are present, convert them to a list
        List<String> roles = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        List<Fonctionnalite> fonctionnaliteList = new ArrayList<>();

        for(String role : roles){
            fonctionnaliteList.add(Fonctionnalite.valueOf(role));
        }

        String token = jwtService.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse(token, "Signin success.", fonctionnaliteList);

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }


    private Authentication authenticate(String email, String password) {
        try {
            UserDetails userDetails = userDetailService.loadUserByUsername(email);

            if (!passwordEncoder.matches(password, userDetails.getPassword())) {
                throw new BadCredentialsException("Invalid password.");
            }

            return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        } catch (UsernameNotFoundException ex) {
            throw new BadCredentialsException(ex.getMessage());
        }
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestParam("email") String email) {
        Utilisateur user = utilisateurRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        String token = UUID.randomUUID().toString();
        utilisateurService.createPasswordResetTokenForUser(user, token);
        utilisateurService.sendPasswordResetEmail(user, token);
        return ResponseEntity.ok("Password reset email sent");
    }

    @GetMapping("/resetPassword")
    public ResponseEntity<?> validateResetToken(@RequestParam("token") String token) {
        Utilisateur user = utilisateurService.getUserByPasswordResetToken(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token");
        }
        return ResponseEntity.ok("Token valid");
    }

    @PostMapping("/savePassword")
    public ResponseEntity<?> savePassword(@RequestParam("token") String token, @RequestParam("password") String password) {
        Utilisateur user = utilisateurService.getUserByPasswordResetToken(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token");
        }
        utilisateurService.changeUserPassword(user, password);
        return ResponseEntity.ok("Password changed successfully");
    }



    //password forgotten

}
