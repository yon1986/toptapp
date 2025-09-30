declare module "@worldcoin/idkit" {
  import * as React from "react";

  export interface ISuccessResult {
    nullifier_hash: string;
    merkle_root: string;
    proof: string[];
    credential_type: string;
    action: string;
    signal: string | null;
  }

  export interface IDKitWidgetProps {
    app_id: string;
    action: string;
    onSuccess: (result: ISuccessResult) => void;
    children: (params: { open: () => void }) => React.ReactNode;
  }

  export const IDKitWidget: React.FC<IDKitWidgetProps>;
}
