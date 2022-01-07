import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private _repo: Repository<User>){}

    create(email: string, password: string)
    {
        const user = this._repo.create({email, password})

        return this._repo.save(user)
    }

    public async findOne(id: string)
    {
        return this._repo.findOne(id)
    }

    public async findByEmail(email: string)
    {
        return this._repo.findOne({email})
    }

    public async findAll()
    {
        return this._repo.find()
    }

    public async update(id: string, attrs: Partial<User>)
    {
        const user = await this.findOne(id)
        if(!user)
        {
            throw new NotFoundException('User not Found')
        }
        Object.assign(user, attrs)
        return this._repo.save(user)
    }


    public async remove(id: string)
    {
        const user = await this.findOne(id)
        if(!user)
        {
            throw new NotFoundException('User not Found')
        }
        this._repo.remove(user);
    }
}
