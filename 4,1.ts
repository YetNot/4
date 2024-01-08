class User {
    messages: number;
    warnings: number;
    period: Date;

    constructor(messages: number, warnings: number, period: Date) {
        this.messages = messages;
        this.warnings = warnings;
        this.period = period;
    }
}

class TrustedUser {
    user: User;

    constructor(user: User) {
        this.user = user;
    }

    getConfidenceRatio(): number {
        const messages = this.user.messages;
        const warnings = this.user.warnings;
        const period = this.getPeriod();

        return messages * 2 - warnings * 100 + period;
    }

    private getPeriod(): number {
        const today = new Date();
        const day = 24 * 60 * 60 * 1000;
        const registrationDate = this.user.period;
        const result = Math.round(Math.abs((today.getTime() - registrationDate.getTime()) / day));

        return result;
    }
}

class ConfidenceHelper {
    static checkConfidenceRatio (ratio: number): boolean {
        return ratio >= 0
    }
}

const users: User[] = [
    new User(10, 0, new Date("2023-07-11")),
    new User(15, 5, new Date("2023-08-05")),
    new User(3, 1, new Date("2023-10-10")),
    new User(8, 2, new Date("2023-02-01")),
    new User(9, 3, new Date("2023-06-28")),
]

const untrustedUsers: User[] =
    users.filter((user) => {
        const trustedUser = new TrustedUser(user);
        const ratio = trustedUser.getConfidenceRatio();
        return !ConfidenceHelper.checkConfidenceRatio(ratio);
});

untrustedUsers.forEach((user) => {
    console.log(user)
})
