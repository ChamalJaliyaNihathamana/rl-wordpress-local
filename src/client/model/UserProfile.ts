export interface UserProfileModel {
  id?: string;
  first_name?: string;
  last_name?: string;
  photo_filename?: string;
  logo_filename?: string;
  username?: string;
  brokerage_name?: string;
  brokerage_city?: string;
  brokerage_state?: string;
  brokerage_id?: number;
  phone?: string;
  email?: string;
  referral_from?: string;
  mls_login?: string;
  mls_password?: string;
  password_hash?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  markets?: any[];
}
