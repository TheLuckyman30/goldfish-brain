import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@repo/database';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class Auth0Service {
    private readonly domain = process.env.AUTH0_DOMAIN!;
    private readonly clientId = process.env.AUTH0_CLIENT_ID!;
    private readonly clientSecret = process.env.AUTH0_CLIENT_SECRET!;
    private readonly audience = `https://${this.domain}/api/v2/`;

    constructor() {
    console.log('AUTH0_DOMAIN =', this.domain);
  }

    private async getManagementToken(): Promise<string> {
        const res = await fetch(`https://${this.domain}/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                audience: this.audience,
                grant_type: 'client_credentials',
            }),
        });

        if (!res.ok) {
            const text = await res.text();
            console.error('Auth0 token error:', text);
            throw new InternalServerErrorException('Failed to get Auth0 token');
        }

        const data = await res.json();
        return data.access_token;
    }

    async updateUsername(auth0UserId: string, newUsername: string) {
        const token = await this.getManagementToken();

        const res = await fetch(
            `https://${this.domain}/api/v2/users/${encodeURIComponent(auth0UserId)}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ username: newUsername} ),
            }
        );

        if (!res.ok) {
            const text = await res.text();
            console.error('Auth0 updateUsername error:', text);
            throw new InternalServerErrorException('Failed to update username in Auth0');
        }
    }
}