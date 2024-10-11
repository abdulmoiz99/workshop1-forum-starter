export class Comments {
    rpid: string;
    user: {
        uid: string;
        avatar: string;
        uname: string;
    };
    content: string;
    ctime: string;
    like: number;

    constructor(
        rpid: string, 
        user: { uid: string; avatar: string; uname: string }, 
        content: string
    ) {
        this.rpid = rpid;
        this.user = user;
        this.content = content;
        this.ctime = this.getDate(); 
        this.like = 0; // Default value for likes
    }

    getDate(): string {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`; // Returns MM/DD/YYYY format
    }
}
