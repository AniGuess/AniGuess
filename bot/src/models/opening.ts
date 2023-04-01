export class Opening {
    constructor(
        title: string,
        youtubeUrl: string,
        imageUrl: string,
        keywords: string[],
    ) {
        this.title = title;
        this.youtubeUrl = youtubeUrl;
        this.imageUrl = imageUrl;
        this.keywords = keywords;
    }


    title: string;
    youtubeUrl: string;
    imageUrl: string;
    keywords: string[];
}

export const openings = [
    new Opening('Eve - Kaikai Kitan', 'https://www.youtube.com/watch?v=1tk1pqwrOys', 'https://i.scdn.co/image/ab67616d0000b2734b54d2a72484832db80a0fe9', ['Jujutsu Kaisen', 'JJK']),
    new Opening('Vaundy - Naked Hero', 'https://www.youtube.com/watch?v=VNj3y8Xykz0', 'https://external-preview.redd.it/NUH2LBqMBTi0U2t4x8zV5OU3qbEMhlS5gZb0l6aEj_I.jpg?auto=webp&s=49c95dbab12a4e663a6584abda55923b27a14ff3', ['Ousama Ranking', 'Ranking of kings']),
];