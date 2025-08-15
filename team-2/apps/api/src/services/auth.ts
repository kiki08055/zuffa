import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET as string
const REFRESH_SECRET = process.env.REFRESH_SECRET as string

export class AuthService {
    async loginUser(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error('User not found');

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error('Invalid password');

        const accessToken = jwt.sign(
            { id: user.id, role: user.role }, // ✅ ubah userId jadi id
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        const refreshToken = jwt.sign(
            { id: user.id }, // ✅ ubah userId jadi id
            REFRESH_SECRET,
            { expiresIn: '1d' }
        );


        await prisma.user.update({
            where: { id: user.id },
            data: { refresh_token: refreshToken },
        });

        return { accessToken, refreshToken, role: user.role };
    }


    async registerAdmin(email: string, password: string) {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) throw new Error('Admin already exists with that email');

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: Role.ADMIN,
                refresh_token: '',
            },
        });

        const accessToken = jwt.sign(
            { id: user.id, role: Role.ADMIN }, // ✅ tambahkan id
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        const refreshToken = jwt.sign(
            { id: user.id }, // ✅ tambahkan id juga
            REFRESH_SECRET,
            { expiresIn: '1d' }
        );

        await prisma.user.update({
            where: { id: user.id },
            data: { refresh_token: refreshToken },
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            accessToken,
            refreshToken
        };
    }


    async refreshToken(token: string) {
        try {
            const payload = jwt.verify(token, REFRESH_SECRET) as { id: number }; // ✅ ganti userId jadi id
            const user = await prisma.user.findUnique({ where: { id: payload.id } });


            if (!user || user.refresh_token !== token) {
                throw new Error('Invalid refresh token');
            }

            const newAccessToken = jwt.sign(
                { id: user.id, role: user.role },
                JWT_SECRET,
                { expiresIn: '1d' }
            );

            return { accessToken: newAccessToken };
        } catch {
            throw new Error('Unauthorized');
        }
    }

    async registerUser(email: string, password: string) {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) throw new Error('User already exists with that email');

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: Role.USER,
                refresh_token: '', // sementara kosong, nanti diisi
            },
        });

        const accessToken = jwt.sign(
            { id: user.id, role: user.role }, // ✅ sisipkan id
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        const refreshToken = jwt.sign(
            { id: user.id }, // ✅ sisipkan id juga
            REFRESH_SECRET,
            { expiresIn: '1d' }
        );

        // update refresh token
        await prisma.user.update({
            where: { id: user.id },
            data: { refresh_token: refreshToken },
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            accessToken,
            refreshToken
        };
    }


}
