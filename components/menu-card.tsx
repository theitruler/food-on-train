import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MenuItem } from '../services/database';

interface MenuCardProps {
  item: MenuItem & { quantity: number };
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onIncrement, onDecrement }) => {
  return (
    <Card className="flex flex-col">
      <CardContent className="flex-grow flex flex-col justify-between p-3">
        <div className="relative w-full h-32 mb-2">
          <Image 
            src={item.imageurl}
            alt={item.foodname}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div>
          <p className="font-semibold mb-1">{item.foodname}</p>
          <p className="font-bold mb-1">Price: ₹{item.price}</p>
          <div className="flex items-center justify-between">
            <Button 
              onClick={() => onDecrement(item.$id)} 
              disabled={item.quantity === 0}
              className="px-2 py-1 text-sm"
            >
              -
            </Button>
            <span className="mx-1 text-base font-semibold">{item.quantity}</span>
            <Button 
              onClick={() => onIncrement(item.$id)}
              className="px-2 py-1 text-sm"
            >
              +
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCard;