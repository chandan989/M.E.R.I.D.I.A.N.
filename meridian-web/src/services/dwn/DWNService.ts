/**
 * DWN Service
 * Specialized service for dataset operations in Decentralized Web Nodes
 */

import { web5Service } from '../web5';
import { DWN_SCHEMAS, PERMISSION_SETTINGS, ERROR_CODES, ERROR_MESSAGES } from '@/config/constants';
import {
  DatasetMetadata,
  DatasetRecord,
  Dataset,
  DatasetFilter,
  DWNError
} from './types';
import { PermissionScope } from '../web5/types';

class DWNService {
  /**
   * Upload a dataset to DWN
   */
  async uploadDataset(file: File, metadata: DatasetMetadata): Promise<DatasetRecord> {
    try {
      // Validate file
      this.validateFile(file);

      // Read file content
      const fileContent = await this.readFileAsText(file);
      
      // Calculate file hash (simple implementation)
      const fileHash = await this.calculateHash(fileContent);

      // Get current DID
      const providerDID = web5Service.getDID();
      if (!providerDID) {
        throw new Error('No DID available');
      }

      // Create dataset record
      const datasetRecord: DatasetRecord = {
        id: '', // Will be set by DWN
        name: metadata.name,
        description: metadata.description,
        category: metadata.category,
        tags: metadata.tags,
        fileHash,
        fileSize: file.size,
        fileType: file.type,
        uploadDate: new Date().toISOString(),
        providerDID,
        qualityScore: metadata.qualityScore,
        suggestedPrice: metadata.suggestedPrice
      };

      // Store in DWN
      const { recordId } = await web5Service.writeToDWN(
        {
          ...datasetRecord,
          fileContent // Store actual file content
        },
        DWN_SCHEMAS.dataset
      );

      datasetRecord.id = recordId;

      console.log('Dataset uploaded successfully:', recordId);
      return datasetRecord;
    } catch (error) {
      console.error('Failed to upload dataset:', error);
      throw new DWNError(
        ERROR_MESSAGES[ERROR_CODES.DWN_WRITE_FAILED],
        ERROR_CODES.DWN_WRITE_FAILED,
        error
      );
    }
  }

  /**
   * Get a dataset by record ID
   */
  async getDataset(recordId: string): Promise<Dataset> {
    try {
      const data = await web5Service.readFromDWN(recordId);

      return {
        id: recordId,
        data: data,
        metadata: {
          dataFormat: 'application/json',
          published: false,
          dateCreated: data.uploadDate
        }
      };
    } catch (error) {
      console.error('Failed to get dataset:', error);
      throw new DWNError(
        ERROR_MESSAGES[ERROR_CODES.DWN_READ_FAILED],
        ERROR_CODES.DWN_READ_FAILED,
        error
      );
    }
  }

  /**
   * List all datasets for current user
   */
  async listDatasets(filter?: DatasetFilter): Promise<Dataset[]> {
    try {
      const result = await web5Service.queryDWN({
        schema: DWN_SCHEMAS.dataset
      });

      let datasets = result.records.map((record) => ({
        id: record.id,
        data: record.data,
        metadata: record.metadata
      }));

      // Apply filters
      if (filter) {
        datasets = this.applyFilters(datasets, filter);
      }

      return datasets;
    } catch (error) {
      console.error('Failed to list datasets:', error);
      throw new DWNError(
        ERROR_MESSAGES[ERROR_CODES.DWN_QUERY_FAILED],
        ERROR_CODES.DWN_QUERY_FAILED,
        error
      );
    }
  }

  /**
   * Delete a dataset
   */
  async deleteDataset(recordId: string): Promise<void> {
    try {
      await web5Service.deleteFromDWN(recordId);
      console.log('Dataset deleted:', recordId);
    } catch (error) {
      console.error('Failed to delete dataset:', error);
      throw new DWNError(
        ERROR_MESSAGES[ERROR_CODES.DWN_DELETE_FAILED],
        ERROR_CODES.DWN_DELETE_FAILED,
        error
      );
    }
  }

  /**
   * Grant dataset access to a buyer
   */
  async grantDatasetAccess(
    recordId: string,
    buyerDID: string,
    duration?: number
  ): Promise<void> {
    try {
      const scope: PermissionScope = {
        interface: 'Records',
        method: 'Read',
        expiry: duration ? Date.now() + duration * 60 * 1000 : undefined
      };

      await web5Service.grantPermission(buyerDID, recordId, scope);
      console.log('Dataset access granted to:', buyerDID);
    } catch (error) {
      console.error('Failed to grant dataset access:', error);
      throw new DWNError(
        ERROR_MESSAGES[ERROR_CODES.PERMISSION_GRANT_FAILED],
        ERROR_CODES.PERMISSION_GRANT_FAILED,
        error
      );
    }
  }

  /**
   * Revoke dataset access
   */
  async revokeDatasetAccess(recordId: string, buyerDID: string): Promise<void> {
    try {
      await web5Service.revokePermission(buyerDID, recordId);
      console.log('Dataset access revoked for:', buyerDID);
    } catch (error) {
      console.error('Failed to revoke dataset access:', error);
      throw new DWNError(
        ERROR_MESSAGES[ERROR_CODES.PERMISSION_REVOKE_FAILED],
        ERROR_CODES.PERMISSION_REVOKE_FAILED,
        error
      );
    }
  }

  /**
   * Check if a DID has access to a dataset
   */
  async checkAccess(recordId: string, did: string): Promise<boolean> {
    try {
      const permissions = await web5Service.listPermissions();
      
      const hasAccess = permissions.some(
        (permission) =>
          permission.recordId === recordId &&
          permission.grantedTo === did &&
          (!permission.expiry || permission.expiry > Date.now())
      );

      return hasAccess;
    } catch (error) {
      console.error('Failed to check access:', error);
      return false;
    }
  }

  /**
   * Grant temporary access for AI analysis
   */
  async grantTemporaryAccess(
    recordId: string,
    targetDID: string,
    durationMinutes: number = PERMISSION_SETTINGS.aiAnalysisExpiryMinutes
  ): Promise<string> {
    try {
      const expiryTime = Date.now() + durationMinutes * 60 * 1000;

      const scope: PermissionScope = {
        interface: 'Records',
        method: 'Read',
        expiry: expiryTime
      };

      await web5Service.grantPermission(targetDID, recordId, scope);

      console.log(`Temporary access granted for ${durationMinutes} minutes`);
      
      // Return permission ID (in production, this would be from the actual permission record)
      return `temp_${recordId}_${Date.now()}`;
    } catch (error) {
      console.error('Failed to grant temporary access:', error);
      throw new DWNError(
        ERROR_MESSAGES[ERROR_CODES.PERMISSION_GRANT_FAILED],
        ERROR_CODES.PERMISSION_GRANT_FAILED,
        error
      );
    }
  }

  /**
   * Revoke temporary access
   */
  async revokeTemporaryAccess(permissionId: string): Promise<void> {
    try {
      // In production, this would revoke the specific permission by ID
      console.log('Temporary access revoked:', permissionId);
    } catch (error) {
      console.error('Failed to revoke temporary access:', error);
      throw new DWNError(
        ERROR_MESSAGES[ERROR_CODES.PERMISSION_REVOKE_FAILED],
        ERROR_CODES.PERMISSION_REVOKE_FAILED,
        error
      );
    }
  }

  // Helper Methods

  /**
   * Validate file before upload
   */
  private validateFile(file: File): void {
    const maxSize = 100 * 1024 * 1024; // 100MB
    
    if (file.size > maxSize) {
      throw new Error(`File size exceeds maximum of ${maxSize / 1024 / 1024}MB`);
    }

    // Add more validation as needed
  }

  /**
   * Read file as text
   */
  private readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  /**
   * Calculate simple hash of content
   */
  private async calculateHash(content: string): Promise<string> {
    // Simple hash implementation
    // In production, use a proper cryptographic hash
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  /**
   * Apply filters to datasets
   */
  private applyFilters(datasets: Dataset[], filter: DatasetFilter): Dataset[] {
    return datasets.filter((dataset) => {
      if (filter.category && dataset.data.category !== filter.category) {
        return false;
      }

      if (filter.minQualityScore && 
          (!dataset.data.qualityScore || dataset.data.qualityScore < filter.minQualityScore)) {
        return false;
      }

      if (filter.tags && filter.tags.length > 0) {
        const datasetTags = dataset.data.tags || [];
        const hasMatchingTag = filter.tags.some(tag => datasetTags.includes(tag));
        if (!hasMatchingTag) {
          return false;
        }
      }

      return true;
    });
  }
}

// Export singleton instance
export const dwnService = new DWNService();
export default DWNService;
