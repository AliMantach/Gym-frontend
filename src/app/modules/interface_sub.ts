export interface Subscription {
    _id?: string;  
    subscriptionname: string;
    description: string;
    price: string;
    duration: number;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
  }
  