import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";


@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;
    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    email: string;
    @Column({ type: 'varchar', length: 15, unique: true, nullable: false })
    phone: string;
    @Column({ type: 'varchar', length: 11, unique: true })
    cpf: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;
    @Column({ type: 'int', nullable: false })
    type_user: number;
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}