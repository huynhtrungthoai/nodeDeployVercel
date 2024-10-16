import { BeforeInsert, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as _bcrypt from 'bcryptjs';
import * as _crypto from 'crypto';
export enum RoleEnumType {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Index('email_index')
    @Column({ unique: true, type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({
        type: 'enum',
        enum: RoleEnumType,
        default: RoleEnumType.USER,
    })
    role: RoleEnumType.USER;

    @Column({ type: 'boolean', default: false })
    verified: boolean;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    avatar: string;

    @Column({ length: 11, type: 'varchar' })
    phone: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    static async hashPassword(password: string) {
        return await _bcrypt.hash(password, 12);
    }

    static async comparePasswords(candidatePassword: string, hashedPassword: string) {
        return await _bcrypt.compare(candidatePassword, hashedPassword);
    }

    static createVerificationCode() {
        const verificationCode = _crypto.randomBytes(32).toString('hex');
        const hashedVerificationCode = _crypto.createHash('sha256').update(verificationCode).digest('hex');
        return { verificationCode, hashedVerificationCode };
    }
}
