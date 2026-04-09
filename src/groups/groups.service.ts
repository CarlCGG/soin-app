import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class GroupsService {
  async getAllGroups() {
    return prisma.group.findMany({
      include: {
        _count: { select: { members: true } },
        members: { select: { userId: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getGroupById(groupId: number) {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        _count: { select: { members: true } },
        members: {
          include: {
            user: { select: { id: true, username: true, avatar: true } },
          },
        },
      },
    });

    const creatorRows = await prisma.$queryRaw<any[]>`
      SELECT u.id, u.username FROM "Group" g
      LEFT JOIN "User" u ON u.id = g."creatorId"
      WHERE g.id = ${groupId}
    `;
    const creator = creatorRows[0]?.id ? { id: creatorRows[0].id, username: creatorRows[0].username } : null;

    return { ...group, creator };
  }

  async createGroup(name: string, description: string, category: string, location: string, userId: number) {
    const group = await prisma.$queryRaw<any[]>`
      INSERT INTO "Group" (name, description, category, location, "creatorId", "createdAt")
      VALUES (${name}, ${description}, ${category}, ${location}, ${userId}, NOW())
      RETURNING *
    `;
    const newGroup = group[0];
    await prisma.groupMember.create({
      data: { groupId: newGroup.id, userId },
    });
    return newGroup;
  }

  async joinGroup(groupId: number, userId: number) {
    const existing = await prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId } },
    });
    if (existing) {
      await prisma.groupMember.delete({ where: { groupId_userId: { groupId, userId } } });
      return { joined: false };
    } else {
      await prisma.groupMember.create({ data: { groupId, userId } });
      return { joined: true };
    }
  }

  async getGroupMessages(groupId: number) {
    return prisma.groupMessage.findMany({
      where: { groupId },
      orderBy: { createdAt: 'asc' },
      include: {
        author: { select: { id: true, username: true, avatar: true } },
      },
    });
  }

  async sendGroupMessage(groupId: number, userId: number, content: string) {
    return prisma.groupMessage.create({
      data: { content, groupId, authorId: userId },
      include: {
        author: { select: { id: true, username: true, avatar: true } },
      },
    });
  }

  async deleteGroup(groupId: number, userId: number) {
    await prisma.groupMessage.deleteMany({ where: { groupId } });
    await prisma.groupMember.deleteMany({ where: { groupId } });
    await prisma.group.delete({ where: { id: groupId } });
    return { success: true };
  }

  async updateGroupDescription(groupId: number, userId: number, description: string) {
    const rows = await prisma.$queryRaw<any[]>`SELECT "creatorId" FROM "Group" WHERE id = ${groupId}`;
    if (rows[0]?.creatorId !== userId) throw new Error('Not authorized');
    await prisma.$executeRaw`UPDATE "Group" SET description = ${description} WHERE id = ${groupId}`;
    return { success: true };
  }

  async deleteGroupPost(postId: number, userId: number, groupId: number) {
    const posts = await prisma.$queryRaw<any[]>`SELECT "authorId" FROM "GroupPost" WHERE id = ${postId}`;
    const groups = await prisma.$queryRaw<any[]>`SELECT "creatorId" FROM "Group" WHERE id = ${groupId}`;
    if (posts[0]?.authorId !== userId && groups[0]?.creatorId !== userId) throw new Error('Not authorized');
    await prisma.$executeRaw`DELETE FROM "GroupPost" WHERE id = ${postId}`;
    return { success: true };
  }

  async getGroupPosts(groupId: number) {
    return prisma.$queryRaw<any[]>`
      SELECT gp.*, u.id as "authorId_", u.username as "authorUsername", u.avatar as "authorAvatar"
      FROM "GroupPost" gp
      LEFT JOIN "User" u ON u.id = gp."authorId"
      WHERE gp."groupId" = ${groupId}
      ORDER BY gp."createdAt" DESC
    `.then(rows => rows.map((row: any) => ({
      id: row.id,
      content: row.content,
      imageUrl: row.imageUrl,
      createdAt: row.createdAt,
      groupId: row.groupId,
      author: { id: row.authorId_, username: row.authorUsername, avatar: row.authorAvatar },
    })));
  }

  async createGroupPost(groupId: number, userId: number, content: string, imageUrl?: string) {
    const rows = await prisma.$queryRaw<any[]>`
      INSERT INTO "GroupPost" (content, "imageUrl", "groupId", "authorId", "createdAt")
      VALUES (${content}, ${imageUrl || null}, ${groupId}, ${userId}, NOW())
      RETURNING *
    `;
    const userRows = await prisma.$queryRaw<any[]>`SELECT id, username, avatar FROM "User" WHERE id = ${userId}`;
    return { ...rows[0], author: userRows[0] };
  }

  async getGroupReviews(groupId: number) {
    return prisma.$queryRaw<any[]>`
      SELECT gr.*, u.id as "authorId_", u.username as "authorUsername", u.avatar as "authorAvatar"
      FROM "GroupReview" gr
      LEFT JOIN "User" u ON u.id = gr."authorId"
      WHERE gr."groupId" = ${groupId}
      ORDER BY gr."createdAt" DESC
    `.then(rows => rows.map((row: any) => ({
      id: row.id,
      rating: row.rating,
      comment: row.comment,
      createdAt: row.createdAt,
      groupId: row.groupId,
      author: { id: row.authorId_, username: row.authorUsername, avatar: row.authorAvatar },
    })));
  }

  async createGroupReview(groupId: number, userId: number, rating: number, comment?: string) {
    await prisma.$executeRaw`
      INSERT INTO "GroupReview" (rating, comment, "groupId", "authorId", "createdAt")
      VALUES (${rating}, ${comment || null}, ${groupId}, ${userId}, NOW())
      ON CONFLICT ("groupId", "authorId") DO UPDATE SET rating = ${rating}, comment = ${comment || null}
    `;
    const userRows = await prisma.$queryRaw<any[]>`SELECT id, username, avatar FROM "User" WHERE id = ${userId}`;
    return { success: true, author: userRows[0] };
  }

  async getSuggestedGroups(userId: number) {
    
    const userRows = await prisma.$queryRaw<any[]>`SELECT tags FROM "User" WHERE id = ${userId}`;
    console.log('userRows:', userRows);
    const tags = userRows[0]?.tags;


    if (!tags) return { groups: [], hasTags: false };

    const userTags = tags.split(',').map((t: string) => t.trim().toLowerCase());

    const allGroups = await prisma.group.findMany({
      include: {
        _count: { select: { members: true } },
        members: { select: { userId: true } },
      },
    });

    const scored = allGroups.map(group => {
      const groupText = `${group.name} ${group.category} ${group.description || ''}`.toLowerCase();
      const score = userTags.filter((tag: string) => groupText.includes(tag)).length;
      return { ...group, score };
    }).filter(g => g.score > 0).sort((a, b) => b.score - a.score);

    return { groups: scored, hasTags: true };
  }

  async getMyGroups(userId: number) {
    return prisma.group.findMany({
      where: {
        members: { some: { userId } }
      },
      select: { id: true, name: true },
    });
  }
  async getAISuggestedGroups(userId: number, aiService: any) {
    const userRows = await prisma.$queryRaw<any[]>`
      SELECT tags, bio, location FROM "User" WHERE id = ${userId}
    `;
    const user = userRows[0];
    if (!user?.tags) return { suggestions: [], reason: 'no_tags' };

    const recentMessages = await prisma.message.findMany({
      where: { senderId: userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: { content: true },
    });
    const messageText = recentMessages.map((m: any) => m.content).join(', ');

    const allGroups = await prisma.group.findMany({
      select: { id: true, name: true, category: true, description: true },
    });

    const joinedGroups = await prisma.groupMember.findMany({
      where: { userId },
      select: { groupId: true },
    });
    const joinedIds = joinedGroups.map((g: any) => g.groupId);
    const notJoined = allGroups.filter(g => !joinedIds.includes(g.id));

    const groupList = notJoined.map(g => `${g.name} (${g.category}): ${g.description || ''}`).join('\n');
    const prompt = `
  User interests: ${user.tags}
  User bio: ${user.bio || 'none'}
  Recent conversations: ${messageText || 'none'}

  Available groups:
  ${groupList || 'none'}

  Based on the user profile and conversations, suggest up to 3 groups they should join AND suggest up to 2 new group names that don't exist yet but would match their interests.

  Respond ONLY with this JSON format:
  {
    "joinSuggestions": [{"id": 1, "name": "group name", "reason": "why they should join"}],
    "newGroupSuggestions": [{"name": "suggested group name", "category": "category", "reason": "why create this"}]
  }
  `;

    try {
      const result = await aiService.generatePost(prompt);
      const cleaned = result.content.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);

      const enriched = parsed.joinSuggestions?.map((s: any) => {
        const group = notJoined.find(g => g.id === s.id || g.name === s.name);
        return { ...s, group };
      }) || [];

      return {
        joinSuggestions: enriched,
        newGroupSuggestions: parsed.newGroupSuggestions || [],
      };
    } catch (e) {
      return { joinSuggestions: [], newGroupSuggestions: [] };
    }
  }
}