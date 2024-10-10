export class Comments {
    rpid: number;
    user: {
        uid: string;
        avatar: string;
        uname: string;
    };
    content: string;
    ctime: string;
    like: number;

    constructor(
        rpid: number, 
        user: { uid: string; avatar: string; uname: string }, 
        content: string
    ) {
        this.rpid = rpid;
        this.user = user;
        this.content = content;
        this.ctime = this.getDate(); // Initialized with current date
        this.like = 0; // Default value for likes
    }

    // This method doesn't need to be an arrow function
    getDate(): string {
        const today = new Date();
        const month = today.getMonth() + 1; // Months are zero-indexed in JS
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`; // Returns MM/DD/YYYY format
    }
}
