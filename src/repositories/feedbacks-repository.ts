export interface FeedbbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbbackCreateData) => Promise<void>;
}