class Job {
    private role: string;
    private salary: number;

    constructor(role: string, salary: number) {
        this.role = role;
        this.salary = salary
    }

    getSalary(): number {
        return this.salary
    }

    work(personName: string): void {
        console.log(`${personName} сейчас работает как ${this.role}`)
    }
}

class Person {
    private job: Job;
    private name: string;

    constructor(name: string) {
        this.name = name
    }
    
    setJob(job: Job): void {
        this.job = job
    }

    getSalary(): number {
        return this.job.getSalary()
    }

    work(): void {
        this.job.work(this.name)
    }
}

const person1 = new Person('Иван');
const person2 = new Person('Петр');

const programmerJob = new Job('Программист', 1000);
const engineerJob = new Job('Инженер', 500);

person1.setJob(programmerJob);
person2.setJob(engineerJob);

person1.work();
person2.work();

person1.setJob(engineerJob);
person2.setJob(programmerJob);

person1.work();
person2.work();
