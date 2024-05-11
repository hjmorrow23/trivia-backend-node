import { Request, Response } from "express";
import { prisma } from "../server";
import { PlayerStatuses } from "../types/player";
import config from "../config/auth.config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { exclude } from "../helpers/exclude";

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const player = await prisma.player.findUnique({
            where: {
                username,
            },
        });
        if (player && bcrypt.compareSync(password, player.password)) {
            let token = jwt.sign({ id: player.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            res.status(200).json({
                id: player.id,
                username: player.username,
                email: player.email,
                token,

            });
        } else {
            res.status(401).json({ error: "Invalid username or password" });
        }
    } catch (e) {
        res.status(400).json({ error: e });
    }
};

export const createPlayer = async (req: Request, res: Response) => {
    try {
        const { email, name, password, username } = req.body;
        const player = await prisma.player.create({
            data: {
                email,
                name,
                password: bcrypt.hashSync(password, 10),
                username,
                status: PlayerStatuses.ACTIVE,
                record: {
                    create: {
                        wins: 0,
                        losses: 0,
                        ties: 0,
                    },
                },
                profile: {
                    create: {
                        avatar: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
                        bio: "",
                        country: "",
                    },
                },
            },
        });
        const playerWithoutPassword = exclude(player, ["password"]);
        res.status(200).json(playerWithoutPassword);
    } catch (e) {
        res.status(400).json({ error: e });
    }
};

export const getPlayers = async (req: Request, res: Response) => {
    try {
        const players = await prisma.player.findMany({
            include: {
                record: true,
                profile: true,
            },
        });
        const playersWithoutPassword = players.map((player) => exclude(player, ["password"]));
        res.status(200).json(playersWithoutPassword);
    } catch (e) {
        res.status(400).json({ error: e });
    }
};

export const getPlayer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const player = await prisma.player.findUnique({
            where: {
                id,
            },
            include: {
                record: true,
                profile: true,
            },
        });
        const playerWithoutPassword = exclude(player, ["password"]);
        res.status(200).json(playerWithoutPassword);
    } catch (e) {
        res.status(400).json({ error: e });
    }
};

export const updatePlayer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { email, name, password, username } = req.body;
        const player = await prisma.player.update({
            where: {
                id,
            },
            data: {
                email,
                name,
                password,
                username,

            },
        });
        const playerWithoutPassword = exclude(player, ["password"]);
        res.status(200).json(playerWithoutPassword);
    } catch (e) {
        res.status(400).json({ error: e });
    }
};

export const deletePlayer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const player = await prisma.player.delete({
            where: {
                id,
            },
        });
        res.status(200).json({ message: "Player deleted successfully" });
    } catch (e) {
        res.status(400).json({ error: e });
    }
};

export const updatePlayerRecord = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { wins, losses, ties } = req.body;
        const player = await prisma.player.update({
            where: {
                id,
            },
            data: {
                record: {
                    update: {
                        wins,
                        losses,
                        ties,
                    },
                },
            },
        });
        res.status(200).json(player);
    } catch (e) {
        res.status(400).json({ error: e });
    }
};

export const clearPlayerRecord = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const player = await prisma.player.update({
            where: {
                id,
            },
            data: {
                record: {
                    update: {
                        wins: 0,
                        losses: 0,
                        ties: 0,
                    },
                },
            },
        });
        res.status(200).json(player);
    } catch (e) {
        res.status(400).json({ error: e });
    }
};

export const updatePlayerStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const player = await prisma.player.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });
        res.status(200).json(player);
    } catch (e) {
        res.status(400).json({ error: e });
    }
}

export const updatePlayerProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { avatar, bio, country } = req.body;
        const player = await prisma.player.update({
            where: {
                id,
            },
            data: {
                profile: {
                    update: {
                        avatar,
                        bio,
                        country,
                    },
                },
            },
        });
        res.status(200).json(player);
    } catch (e) {
        res.status(400).json({ error: e });
    }
};
