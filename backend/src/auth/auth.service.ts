import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private users: any[] = []; 

  constructor(private jwtService: JwtService) {} // JWT Service yahan add ki

  async register(username: string, pass: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    const newUser = { id: Date.now(), username, password: hashedPassword };
    this.users.push(newUser);
    return { message: "Registered!", user: { username } };
  }

  async login(username: string, pass: string) {
    // 1. User dhundo
    const user = this.users.find(u => u.username === username);
    if (!user) throw new UnauthorizedException('User not found');

    // 2. Password check karo
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('Wrong password');

    // 3. Token banao
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}