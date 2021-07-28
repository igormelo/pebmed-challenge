export class Doctor {
    public readonly id: string;
    public name: string
    public lastname: string;
    public login: string;
    public password: string;
    
    constructor (props: Omit<Doctor, 'id'>, id?: string) {

        
    }
}