import jwt from 'jsonwebtoken'
import { JWT_SECRETKEY, REFRESH_SECRETKEY } from '../Config/index.js';
class jwtService {
    static sign(payload , secret =JWT_SECRETKEY ,expriy ='1d'){
        return jwt.sign(payload,secret,{expiresIn:expriy});
    }
    static verify(token, secret =JWT_SECRETKEY ){
        return jwt.verify(token,secret);
    }
}
export default jwtService;