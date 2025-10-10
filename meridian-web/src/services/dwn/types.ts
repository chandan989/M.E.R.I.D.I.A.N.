/**
 * DWN Service Types
 * Type definitions for dataset operations
 */

// Dataset Metadata
export interface DatasetMetadata {
  name: string;
  description: string;
  category: string;
  tags?: string[];
  fileSize: number;
  fileType: string;
  qualityScore?: number;
  suggestedPrice?: string;
}

// Dataset Record
export interface DatasetRecord {
  id: string;
  name: string;
  description: string;
  category: string;
  tags?: string[];
  fileHash: string;
  fileSize: number;
  fileType: string;
  uploadDate: string;
  providerDID: string;
  qualityScore?: number;
  suggestedPrice?: string;
}

// Dataset
export interface Dataset {
  id: string;
  data: DatasetRecord;
  metadata: {
    dataFormat: string;
    published: boolean;
    dateCreated: string;
    dateModified?: string;
  };
}

// Dataset Filter
export interface DatasetFilter {
  category?: string;
  tags?: string[];
  minQualityScore?: number;
  maxPrice?: string;
}

// DWN Error
export class DWNError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'DWNError';
  }
}
