 export function rand(min: number, max: number): number {
     return Math.round((Math.random() * (max - min) + min) * 100) / 100;
   }
   
   export function pick<T>(arr: readonly T[]): T {
     return arr[Math.floor(Math.random() * arr.length)];
   }
   
   export function noFees() {
     return {
       hasCreditCardFee: false,
       hasExitFee: false,
     };
   }
   