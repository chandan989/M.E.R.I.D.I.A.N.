/**
 * System Status Component
 * Shows status of both Web5 and Web3 integrations
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Wallet, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useWeb3 } from "@/hooks/useWeb3";
import { web5Service } from "@/services/web5";
import { CONTRACT_ADDRESSES, NETWORK_CONFIG } from "@/config/contracts";
import { WEB5_CONFIG } from "@/config/wallet.config";

export function SystemStatus() {
  const { isConnected: web3Connected, address, chainId } = useWeb3();
  const web5Connected = web5Service.isConnected();
  const web5MockMode = web5Service.isMockMode();
  const web5DID = web5Service.getDID();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">System Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Web5 Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="font-medium">Web5 (Data Storage)</span>
            </div>
            {web5Connected ? (
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            ) : (
              <Badge variant="secondary">
                <XCircle className="h-3 w-3 mr-1" />
                Not Connected
              </Badge>
            )}
          </div>
          
          {web5Connected && (
            <div className="ml-6 space-y-1 text-sm text-muted-foreground">
              <div>DID: {web5DID?.slice(0, 20)}...</div>
              <div className="flex items-center gap-2">
                <span>Storage:</span>
                {web5MockMode ? (
                  <Badge variant="outline" className="text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    localStorage (Mock Mode)
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs bg-green-50">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    DWN Server
                  </Badge>
                )}
              </div>
              {!web5MockMode && (
                <>
                  <div className="text-xs">DWN: {WEB5_CONFIG.techPreview.dwnEndpoints[0]}</div>
                  <div className="text-xs">DHT: {WEB5_CONFIG.didDhtGateway}</div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Web3 Status */}
        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span className="font-medium">Web3 (Blockchain)</span>
            </div>
            {web3Connected ? (
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            ) : (
              <Badge variant="secondary">
                <XCircle className="h-3 w-3 mr-1" />
                Not Connected
              </Badge>
            )}
          </div>
          
          {web3Connected && (
            <div className="ml-6 space-y-1 text-sm text-muted-foreground">
              <div>Wallet: {address?.slice(0, 6)}...{address?.slice(-4)}</div>
              <div>Network: {NETWORK_CONFIG.name} (Chain {chainId})</div>
              <div className="text-xs pt-1 space-y-1">
                <div>NFT: {CONTRACT_ADDRESSES.MeridianNFT.slice(0, 10)}...</div>
                <div>Market: {CONTRACT_ADDRESSES.MeridianMarket.slice(0, 10)}...</div>
              </div>
            </div>
          )}
        </div>

        {/* Combined Status */}
        <div className="pt-3 border-t">
          {web5Connected && web3Connected ? (
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800">
                ✅ Full Stack Active: Web5 + Web3
              </p>
            </div>
          ) : (
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-sm font-medium text-orange-800">
                Connect both systems for full functionality
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default SystemStatus;

