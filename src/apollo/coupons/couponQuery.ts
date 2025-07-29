import { gql } from "@apollo/client";

export const COUPONS_LISTING = gql`
  query GetAllCoupons {
    getAllCoupons {
      id
      couponName
      couponCode
      couponType
      createdAt
      duration
    }
  }
`;

export const GET_COUPON_BY_ID = gql`
  query GetCouponById($id: ID!) {
    getCouponById(id: $id) {
      id
      couponName
      couponCode
      couponType
      discountValue
      appliesTo
      duration
      noDuration
      usageLimit
      noUsageLimit
      createdAt
    }
  }
`;
