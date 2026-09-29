package br.com.willianfidelis.willbank.config;

import org.springframework.context.annotation.Configuration; // marca a classe como configuração do Spring
import org.springframework.web.servlet.config.annotation.CorsRegistry; // registro das regras de CORS
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer; // permite customizar o Spring MVC

@Configuration // o Spring lê esta classe ao subir a aplicação
public class CorsConfig implements WebMvcConfigurer {

    // CORS: por segurança, o navegador bloqueia chamadas de um endereço (Angular em localhost:4200)
    // para outro endereço (API em localhost:8080). Aqui liberamos o front-end a chamar a API.
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // vale para todos os endpoints
                .allowedOrigins("http://localhost:4200") // endereço do Angular (ng serve)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // métodos liberados
                .allowedHeaders("*");
    }
}
