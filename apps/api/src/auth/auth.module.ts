import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { PrismaService } from "src/prisma.service";

@Module({
    imports: [PassportModule.register({defaultStrategy: 'jwt'})],
    controllers: [],
    providers: [JwtStrategy, PrismaService],
    exports: [PassportModule]
})
export class AuthModule {}