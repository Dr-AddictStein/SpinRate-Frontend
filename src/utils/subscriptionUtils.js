/**
 * Utility functions for handling subscription status
 */

/**
 * Check if user has lost their subscription
 * @param {Object} user - User object from auth context
 * @returns {boolean} - True if subscription is lost, false otherwise
 */
export const hasLostSubscription = (user) => {
  if (!user?.user) return false;
  
  const { subscriptionRemaining, lastPaymentDate } = user.user;
  
  // If no lastPaymentDate, treat as free trial
  if (!lastPaymentDate) return false;
  
  const currentDate = new Date();
  const lastPayment = new Date(lastPaymentDate);
  const daysSinceLastPayment = Math.floor((currentDate - lastPayment) / (1000 * 60 * 60 * 24));
  

  
  // If subscriptionRemaining is 7, it's a free trial
  if (subscriptionRemaining === 7) {
    const lost = daysSinceLastPayment >= subscriptionRemaining;
    return lost;
  }
  
  // For paid subscriptions, check if days since last payment exceed remaining days
  const lost = daysSinceLastPayment >= subscriptionRemaining;
  return lost;
};

/**
 * Check if user is on free trial
 * @param {Object} user - User object from auth context
 * @returns {boolean} - True if on free trial, false otherwise
 */
export const isOnFreeTrial = (user) => {
  if (!user?.user) return false;
  
  const { subscriptionRemaining, lastPaymentDate } = user.user;
  
  // If subscriptionRemaining is 7, it's a free trial
  if (subscriptionRemaining === 7) {
    const onTrial = !hasLostSubscription(user);
    return onTrial;
  }
  
  return false;
};

/**
 * Get remaining days for free trial
 * @param {Object} user - User object from auth context
 * @returns {number} - Remaining days, 0 if not on free trial or expired
 */
export const getFreeTrialRemainingDays = (user) => {
  if (!isOnFreeTrial(user)) return 0;
  
  const { lastPaymentDate } = user.user;
  const currentDate = new Date();
  const lastPayment = new Date(lastPaymentDate);
  const daysSinceLastPayment = Math.floor((currentDate - lastPayment) / (1000 * 60 * 60 * 24));
  
  return Math.max(0, 7 - daysSinceLastPayment);
};

/**
 * Get subscription status summary
 * @param {Object} user - User object from auth context
 * @returns {Object} - Status object with type and remaining days
 */
export const getSubscriptionStatus = (user) => {
  if (!user?.user) {
    return { type: 'none', remainingDays: 0 };
  }
  
  if (isOnFreeTrial(user)) {
    return {
      type: 'free_trial',
      remainingDays: getFreeTrialRemainingDays(user)
    };
  }
  
  if (hasLostSubscription(user)) {
    return { type: 'expired', remainingDays: 0 };
  }
  
  return { type: 'active', remainingDays: user.user.subscriptionRemaining };
}; 