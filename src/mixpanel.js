// import mixpanel from 'mixpanel-browser';
// Мок-объект с логированием для разработки
const mixpanel = {
  init: () => {},
  track: (event, props) => {
    console.log(`[Mixpanel mock] Event: ${event}`, props);
  },
};
const PROJECT_TOKEN = '';

mixpanel.init(PROJECT_TOKEN, {
  debug: false,
  track_pageview: false,
  persistence: 'localStorage',
});

const defaultProps = () => ({
  referrer: document.referrer || 'direct',
  device_type: navigator.userAgent,
  timestamp: new Date().toISOString(),
});

// Трекинг событий открытия квиза
export function trackQuizViewed() {
  mixpanel.track('quiz_viewed', defaultProps());
}

// Трекинг старта квиза
export function trackQuizStarted(step_index = 0) {
  mixpanel.track('quiz_started', { step_index, ...defaultProps() });
}

// Трекинг выбора варианта ответа
export function trackQuizOptionSelected({ step_index, option_index, option_text }) {
  mixpanel.track('quiz_option_selected', { step_index, option_index, option_text, ...defaultProps() });
}

// Трекинг завершения шага (любой шаг)
export function trackQuizStepCompleted({ step_index, step_id, value, ms_spent }) {
  mixpanel.track('quiz_step_completed', { step_index, step_id, value, ms_spent, ...defaultProps() });
}

// Трекинг ввода юзернейма
export function trackUsernameEntered({ step_index, username_hashed }) {
  mixpanel.track('quiz_username_entered', { step_index, username: username_hashed, ...defaultProps() });
}

// Показ блока результатов (анализа)
export function trackQuizAnalysisShown({ perc_nonmutual, perc_bots, perc_inactive }) {
  mixpanel.track('quiz_analysis_shown', { perc_nonmutual, perc_bots, perc_inactive, ...defaultProps() });
}

// Клик детального отчёта
export function trackQuizReportClick({ perc_nonmutual, perc_bots, perc_inactive }) {
  mixpanel.track('quiz_report_cta_click', { perc_nonmutual, perc_bots, perc_inactive, ...defaultProps() });
}

// Показ paywall
export function trackPaywallShown({ offer_type, price, plan, step_index }) {
  mixpanel.track('paywall_shown', { offer_type, price, plan, step_index, ...defaultProps() });
}

// Клик по кнопке оплаты
export function trackPaywallCtaClick({ offer_type, price, plan, step_index }) {
  mixpanel.track('paywall_cta_click', { offer_type, price, plan, step_index, ...defaultProps() });
}

// Успешная покупка
export function trackPurchaseSuccess({ price, plan, payment_provider }) {
  mixpanel.track('purchase_success', { price, plan, payment_provider, ...defaultProps() });
}

// Ошибка или отмена оплаты
export function trackPurchaseFailed({ price, plan, error_type }) {
  mixpanel.track('purchase_failed', { price, plan, error_type, ...defaultProps() });
}

// Завершение квиза
export function trackQuizCompleted({ steps_completed, username_masked }) {
  mixpanel.track('quiz_completed', { steps_completed, username: username_masked, ...defaultProps() });
}

// Отказ/выход с квиза
export function trackQuizAbandoned({ step_index, reason }) {
  mixpanel.track('quiz_abandoned', { step_index, reason, ...defaultProps() });
}
