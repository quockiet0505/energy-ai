export type DetectedIssue = {
     issue_code: string;
     estimated_annual_loss: number;
   };
   
   export type RankedItem = {
     id: string;
     rank: number;
     reason_codes: string[];
   };
   