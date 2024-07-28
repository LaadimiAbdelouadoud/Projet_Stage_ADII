package com.adii.systemeGestionClassementTarifaire.Controller;

import com.adii.systemeGestionClassementTarifaire.config.JwtService;
import com.adii.systemeGestionClassementTarifaire.request.LoginRequest;
import com.adii.systemeGestionClassementTarifaire.model.Fonctionnalite;
import com.adii.systemeGestionClassementTarifaire.response.AuthResponse;
import com.adii.systemeGestionClassementTarifaire.service.UserDetailService;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@RestController
@RequestMapping("/utilisateur")
public class UtilisateurController {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserDetailService userDetailService;

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



    //password forgotten

}
