import { User } from 'src/users/users.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
    @ManyToOne(type => User, user => user.tasks)
    user: User;
}
