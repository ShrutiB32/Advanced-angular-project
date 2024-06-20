export interface IExercise {
    id ?: any;
    name?: any;
    duration?: any;
    calories?: any;
    date?: Date;
    state?: 'completed' | 'cancelled' | null;
    
}