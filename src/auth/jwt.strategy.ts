
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport"; 

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() ,
            secretOrKey: "meu_segredo"
        })
    }

    async validate(payload: any){
        return {
            id: payload.id,
            email: payload.email,
            role: payload.role
        };
    }
}