import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from './entities/friend.entity';
import { App } from 'src/app/entities/app.entity';
import { Room } from './entities/room.entity';

@Injectable()
export class WxResourceService {
  constructor(
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  // 批量保存朋友
  async saveFriends(friends: Friend[]): Promise<Friend[]> {
    return this.friendRepository.save(friends);
  }

  // 查询所有朋友
  async findAllFriends(): Promise<Friend[]> {
    return this.friendRepository.find();
  }

  // 根据ID查询单个朋友
  async findFriendById(id: string): Promise<Friend> {
    return this.friendRepository.findOneBy({ friendId: id });
  }

  async findAppByFriendId(friendId: string): Promise<App> {
    const friend = await this.friendRepository.findOne({
      where: { friendId: friendId },
      relations: ['app'], // 确保加载了关联的 App 实体
    });

    if (!friend) {
      throw new Error('Friend not found');
    }

    return friend.app;
  }
  async findAppByRoomId(roomId: string): Promise<App> {
    const room = await this.roomRepository.findOne({
      where: { roomId: roomId },
      relations: ['app'], // 确保加载了关联的 App 实体
    });

    if (!room) {
      throw new Error('Friend not found');
    }

    return room.app;
  }
}
