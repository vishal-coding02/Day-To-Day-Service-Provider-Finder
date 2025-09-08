export default interface Package {
  id: string | null;
  title: string;
  description: string;
  price: number;
  duration: string;
  servicesIncluded: string[];
  deliveryTime: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
