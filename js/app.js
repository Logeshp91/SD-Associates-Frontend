// SD Associates CRM - Client Application Logic

const state = {
  activeCrm: 'finance',

  // Vehicle Loan CRM
  leads: [],
  allLeads: [],
  stats: {},
  filters: {
    search: '',
    status: 'All',
    loanType: 'All',
    finance: 'All',
    disbursedMonth: 'All'
  },
  exportFilter: {
    status: 'All',
    loanType: 'All',
    finance: 'All',
    disbursedMonth: '',
    dateRange: 'all',
    fromDate: '',
    toDate: ''
  },
  currentEditingId: null,
  currentViewingLead: null,

  // Insurance CRM
  insurancePolicies: [],
  allInsurancePolicies: [],
  insuranceStats: {},
  insuranceFilters: {
    search: '',
    status: 'All',
    insuranceCompany: 'All',
    loanType: 'All',
    expiryMonth: ''
  },
  insuranceExportFilter: {
    status: 'All',
    loanType: 'All',
    insuranceCompany: 'All',
    expiryMonth: ''
  },
  currentEditingInsuranceId: null,
  currentViewingInsurance: null
};

// DOM Elements
const elements = {
  // Stats
  statTotalLeads: document.getElementById('statTotalLeads'),
  statInProcess: document.getElementById('statInProcess'),
  statApproved: document.getElementById('statApproved'),
  statDisbursed: document.getElementById('statDisbursed'),
  statDisbursedVolume: document.getElementById('statDisbursedVolume'),
  statTotalVolume: document.getElementById('statTotalVolume'),
  leadsCountBadge: document.getElementById('leadsCountBadge'),
  lastUpdatedTime: document.getElementById('lastUpdatedTime'),

  // Filters & Search
  searchInput: document.getElementById('searchInput'),
  btnClearSearch: document.getElementById('btnClearSearch'),
  statusTabs: document.getElementById('statusTabs'),
  filterDisbursedMonth: document.getElementById('filterDisbursedMonth'),
  filterLoanType: document.getElementById('filterLoanType'),
  filterFinance: document.getElementById('filterFinance'),
  btnResetFilters: document.getElementById('btnResetFilters'),

  // Table
  leadsTableBody: document.getElementById('leadsTableBody'),
  emptyState: document.getElementById('emptyState'),
  btnRefresh: document.getElementById('btnRefresh'),
  btnOpenDownloadModal: document.getElementById('btnOpenDownloadModal'),
  btnQuickDownloadFiltered: document.getElementById('btnQuickDownloadFiltered'),
  downloadTableCount: document.getElementById('downloadTableCount'),

  // Download & Export Modal
  downloadModal: document.getElementById('downloadModal'),
  btnCloseDownloadModal: document.getElementById('btnCloseDownloadModal'),
  btnCancelDownload: document.getElementById('btnCancelDownload'),
  btnExecuteDownload: document.getElementById('btnExecuteDownload'),
  btnExecuteDownloadPdf: document.getElementById('btnExecuteDownloadPdf'),
  exportStatusOptions: document.getElementById('exportStatusOptions'),
  exportLoanTypeOptions: document.getElementById('exportLoanTypeOptions'),
  exportDisbursedMonth: document.getElementById('exportDisbursedMonth'),
  btnExportThisMonth: document.getElementById('btnExportThisMonth'),
  btnExportAllMonths: document.getElementById('btnExportAllMonths'),
  exportFinanceSelect: document.getElementById('exportFinanceSelect'),
  exportDateRange: document.getElementById('exportDateRange'),
  exportCustomDateRow: document.getElementById('exportCustomDateRow'),
  exportFromDate: document.getElementById('exportFromDate'),
  exportToDate: document.getElementById('exportToDate'),
  exportMatchCount: document.getElementById('exportMatchCount'),
  exportMatchVolume: document.getElementById('exportMatchVolume'),
  exportPreviewFilename: document.getElementById('exportPreviewFilename'),

  // Modals & Buttons
  btnOpenNewLead: document.getElementById('btnOpenNewLead'),
  btnEmptyAddLead: document.getElementById('btnEmptyAddLead'),
  leadFormModal: document.getElementById('leadFormModal'),
  btnCloseFormModal: document.getElementById('btnCloseFormModal'),
  btnCancelForm: document.getElementById('btnCancelForm'),
  editModeBanner: document.getElementById('editModeBanner'),
  formModalTitle: document.getElementById('formModalTitle'),
  formModalSubtitle: document.getElementById('formModalSubtitle'),
  saveBtnText: document.getElementById('saveBtnText'),
  leadForm: document.getElementById('leadForm'),
  btnAutoSerial: document.getElementById('btnAutoSerial'),

  // Form Fields
  leadId: document.getElementById('leadId'),
  serialNo: document.getElementById('serialNo'),
  customerName: document.getElementById('customerName'),
  mobileNumber: document.getElementById('mobileNumber'),
  loanType: document.getElementById('loanType'),
  loanAmount: document.getElementById('loanAmount'),
  vehicleNumber: document.getElementById('vehicleNumber'),
  model: document.getElementById('model'),
  variant: document.getElementById('variant'),
  referenceBy: document.getElementById('referenceBy'),
  financeName: document.getElementById('financeName'),
  loginDate: document.getElementById('loginDate'),
  status: document.getElementById('status'),
  disbursedSection: document.getElementById('disbursedSection'),
  disbursedAmount: document.getElementById('disbursedAmount'),
  disbursedDate: document.getElementById('disbursedDate'),
  rtoAmount: document.getElementById('rtoAmount'),
  rtoName: document.getElementById('rtoName'),
  sellerAmount: document.getElementById('sellerAmount'),
  sellerName: document.getElementById('sellerName'),
  sellerDate: document.getElementById('sellerDate'),
  utrNo: document.getElementById('utrNo'),
  notes: document.getElementById('notes'),

  // View Details Modal
  viewDetailsModal: document.getElementById('viewDetailsModal'),
  btnCloseViewModal: document.getElementById('btnCloseViewModal'),
  btnCloseViewBottom: document.getElementById('btnCloseViewBottom'),
  btnDeleteLead: document.getElementById('btnDeleteLead'),
  btnEditFromView: document.getElementById('btnEditFromView'),
  btnEditLeadDirect: document.getElementById('btnEditLeadDirect'),
  btnPrintSlip: document.getElementById('btnPrintSlip'),
  btnQuickCall: document.getElementById('btnQuickCall'),
  btnQuickWhatsapp: document.getElementById('btnQuickWhatsapp'),

  // View Fields
  viewStatusBadge: document.getElementById('viewStatusBadge'),
  viewCustomerName: document.getElementById('viewCustomerName'),
  viewSerialNo: document.getElementById('viewSerialNo'),
  viewLoanType: document.getElementById('viewLoanType'),
  viewLoanAmount: document.getElementById('viewLoanAmount'),
  viewFinanceName: document.getElementById('viewFinanceName'),
  viewLoginDate: document.getElementById('viewLoginDate'),
  viewStatus: document.getElementById('viewStatus'),
  viewDisbursedAmount: document.getElementById('viewDisbursedAmount'),
  viewDisbursedDate: document.getElementById('viewDisbursedDate'),
  viewUtrNo: document.getElementById('viewUtrNo'),
  viewRtoAmount: document.getElementById('viewRtoAmount'),
  viewRtoName: document.getElementById('viewRtoName'),
  viewSellerAmount: document.getElementById('viewSellerAmount'),
  viewSellerName: document.getElementById('viewSellerName'),
  viewSellerDate: document.getElementById('viewSellerDate'),
  viewVehicleNumber: document.getElementById('viewVehicleNumber'),
  viewModel: document.getElementById('viewModel'),
  viewVariant: document.getElementById('viewVariant'),
  viewMobileNumber: document.getElementById('viewMobileNumber'),
  viewReferenceBy: document.getElementById('viewReferenceBy'),
  viewNotes: document.getElementById('viewNotes'),

  // CRM Module Switcher
  btnSwitchFinance: document.getElementById('btnSwitchFinance'),
  btnSwitchInsurance: document.getElementById('btnSwitchInsurance'),
  brandSubtitle: document.getElementById('brandSubtitle'),
  insuranceNavBadge: document.getElementById('insuranceNavBadge'),
  financeHeaderActions: document.getElementById('financeHeaderActions'),
  insuranceHeaderActions: document.getElementById('insuranceHeaderActions'),
  financeCrmView: document.getElementById('financeCrmView'),
  insuranceCrmView: document.getElementById('insuranceCrmView'),

  // Insurance Stats & Expiry Alert Banner
  insuranceExpiryAlertBanner: document.getElementById('insuranceExpiryAlertBanner'),
  bannerExpiringCount: document.getElementById('bannerExpiringCount'),
  btnBannerViewExpiring: document.getElementById('btnBannerViewExpiring'),
  statTotalInsurance: document.getElementById('statTotalInsurance'),
  statExpiringSoonInsurance: document.getElementById('statExpiringSoonInsurance'),
  statExpiredInsurance: document.getElementById('statExpiredInsurance'),
  statActiveInsurance: document.getElementById('statActiveInsurance'),
  statTotalPremium: document.getElementById('statTotalPremium'),
  statTotalIdv: document.getElementById('statTotalIdv'),

  // Insurance Filters & Search
  insuranceSearchInput: document.getElementById('insuranceSearchInput'),
  btnClearInsuranceSearch: document.getElementById('btnClearInsuranceSearch'),
  insuranceStatusTabs: document.getElementById('insuranceStatusTabs'),
  tabExpiringCountBadge: document.getElementById('tabExpiringCountBadge'),
  filterInsuranceCompany: document.getElementById('filterInsuranceCompany'),
  filterInsuranceType: document.getElementById('filterInsuranceType'),
  filterInsuranceExpiryMonth: document.getElementById('filterInsuranceExpiryMonth'),
  btnResetInsuranceFilters: document.getElementById('btnResetInsuranceFilters'),

  // Insurance Table
  insuranceCountBadge: document.getElementById('insuranceCountBadge'),
  insuranceLastUpdatedTime: document.getElementById('insuranceLastUpdatedTime'),
  btnRefreshInsurance: document.getElementById('btnRefreshInsurance'),
  btnQuickDownloadInsuranceFiltered: document.getElementById('btnQuickDownloadInsuranceFiltered'),
  downloadInsuranceTableCount: document.getElementById('downloadInsuranceTableCount'),
  insuranceTableBody: document.getElementById('insuranceTableBody'),
  insuranceEmptyState: document.getElementById('insuranceEmptyState'),
  btnEmptyAddInsurance: document.getElementById('btnEmptyAddInsurance'),
  btnOpenNewInsurance: document.getElementById('btnOpenNewInsurance'),

  // Insurance Form Modal
  insuranceFormModal: document.getElementById('insuranceFormModal'),
  btnCloseInsuranceFormModal: document.getElementById('btnCloseInsuranceFormModal'),
  btnCancelInsuranceForm: document.getElementById('btnCancelInsuranceForm'),
  insuranceEditModeBanner: document.getElementById('insuranceEditModeBanner'),
  insuranceFormModalTitle: document.getElementById('insuranceFormModalTitle'),
  insuranceFormModalSubtitle: document.getElementById('insuranceFormModalSubtitle'),
  saveInsuranceBtnText: document.getElementById('saveInsuranceBtnText'),
  insuranceForm: document.getElementById('insuranceForm'),
  btnAutoInsuranceSerial: document.getElementById('btnAutoInsuranceSerial'),
  insuranceId: document.getElementById('insuranceId'),
  insuranceSerialNo: document.getElementById('insuranceSerialNo'),
  insuranceCustomerName: document.getElementById('insuranceCustomerName'),
  insuranceMobileNumber: document.getElementById('insuranceMobileNumber'),
  insuranceLoanType: document.getElementById('insuranceLoanType'),
  insuranceVehicleNumber: document.getElementById('insuranceVehicleNumber'),
  insuranceModel: document.getElementById('insuranceModel'),
  insuranceVariant: document.getElementById('insuranceVariant'),
  insuranceIdvValue: document.getElementById('insuranceIdvValue'),
  insurancePremiumAmount: document.getElementById('insurancePremiumAmount'),
  insuranceFromDate: document.getElementById('insuranceFromDate'),
  insuranceToDate: document.getElementById('insuranceToDate'),
  insuranceFormExpiryPreview: document.getElementById('insuranceFormExpiryPreview'),
  insuranceCompany: document.getElementById('insuranceCompany'),
  insurancePolicyNumber: document.getElementById('insurancePolicyNumber'),
  insuranceReferenceBy: document.getElementById('insuranceReferenceBy'),
  insuranceStatus: document.getElementById('insuranceStatus'),
  insuranceNotes: document.getElementById('insuranceNotes'),

  // Insurance View Modal
  viewInsuranceModal: document.getElementById('viewInsuranceModal'),
  btnCloseViewInsuranceModal: document.getElementById('btnCloseViewInsuranceModal'),
  btnCloseViewInsuranceBtn: document.getElementById('btnCloseViewInsuranceBtn'),
  viewInsuranceAlertBanner: document.getElementById('viewInsuranceAlertBanner'),
  viewInsuranceTypeBadge: document.getElementById('viewInsuranceTypeBadge'),
  viewInsuranceStatusBadge: document.getElementById('viewInsuranceStatusBadge'),
  viewInsuranceCustomerName: document.getElementById('viewInsuranceCustomerName'),
  viewInsuranceSerialNo: document.getElementById('viewInsuranceSerialNo'),
  viewInsurancePolicyNo: document.getElementById('viewInsurancePolicyNo'),
  viewInsCustName: document.getElementById('viewInsCustName'),
  viewInsMobile: document.getElementById('viewInsMobile'),
  viewInsReference: document.getElementById('viewInsReference'),
  viewInsVehNo: document.getElementById('viewInsVehNo'),
  viewInsModel: document.getElementById('viewInsModel'),
  viewInsVariant: document.getElementById('viewInsVariant'),
  viewInsIdv: document.getElementById('viewInsIdv'),
  viewInsPremium: document.getElementById('viewInsPremium'),
  viewInsLoanType: document.getElementById('viewInsLoanType'),
  viewInsStatus: document.getElementById('viewInsStatus'),
  viewInsCompany: document.getElementById('viewInsCompany'),
  viewInsPolicyNumber: document.getElementById('viewInsPolicyNumber'),
  viewInsFromDate: document.getElementById('viewInsFromDate'),
  viewInsToDate: document.getElementById('viewInsToDate'),
  viewInsDaysLeft: document.getElementById('viewInsDaysLeft'),
  viewInsNotes: document.getElementById('viewInsNotes'),
  btnInsWhatsApp: document.getElementById('btnInsWhatsApp'),
  btnInsCall: document.getElementById('btnInsCall'),
  btnEditFromInsuranceView: document.getElementById('btnEditFromInsuranceView'),
  btnPrintInsuranceSlip: document.getElementById('btnPrintInsuranceSlip'),
  btnDeleteFromInsuranceView: document.getElementById('btnDeleteFromInsuranceView'),

  // Insurance Download Modal
  insuranceDownloadModal: document.getElementById('insuranceDownloadModal'),
  btnOpenInsuranceDownload: document.getElementById('btnOpenInsuranceDownload'),
  btnCloseInsuranceDownloadModal: document.getElementById('btnCloseInsuranceDownloadModal'),
  btnCancelInsuranceDownload: document.getElementById('btnCancelInsuranceDownload'),
  btnExecuteInsuranceDownload: document.getElementById('btnExecuteInsuranceDownload'),
  btnExecuteInsuranceDownloadPdf: document.getElementById('btnExecuteInsuranceDownloadPdf'),
  exportInsStatusOptions: document.getElementById('exportInsStatusOptions'),
  exportInsTypeOptions: document.getElementById('exportInsTypeOptions'),
  exportInsExpiryMonth: document.getElementById('exportInsExpiryMonth'),
  btnExportInsThisMonth: document.getElementById('btnExportInsThisMonth'),
  btnExportInsNextMonth: document.getElementById('btnExportInsNextMonth'),
  btnExportInsAllMonths: document.getElementById('btnExportInsAllMonths'),
  exportInsCompanySelect: document.getElementById('exportInsCompanySelect'),
  exportInsMatchCount: document.getElementById('exportInsMatchCount'),
  exportInsMatchPremium: document.getElementById('exportInsMatchPremium'),
  exportInsPreviewFilename: document.getElementById('exportInsPreviewFilename'),

  // Toast
  toast: document.getElementById('toast')
};

// Utilities
function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(num);
}

function formatShortCurrency(amount) {
  const num = Number(amount) || 0;
  if (num >= 10000000) {
    return '₹' + (num / 10000000).toFixed(2) + ' Cr';
  }
  if (num >= 100000) {
    return '₹' + (num / 100000).toFixed(2) + ' L';
  }
  return formatCurrency(num);
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

function showToast(message, type = 'success') {
  const t = elements.toast;
  t.textContent = message;
  t.className = `toast toast-${type}`;
  setTimeout(() => {
    t.className = 'toast hidden';
  }, 3500);
}

function getStatusBadgeClass(status) {
  const s = (status || '').toLowerCase().replace(/\s+/g, '-');
  return `status-badge status-${s}`;
}

function getLoanTypeBadgeClass(loanType) {
  const lt = (loanType || '').toLowerCase().replace(/\s+/g, '-');
  return `badge badge-${lt}`;
}

// API Calls
async function fetchLeads() {
  try {
    const isUnfiltered = !state.filters.search && 
      state.filters.status === 'All' && 
      state.filters.loanType === 'All' && 
      state.filters.finance === 'All' &&
      state.filters.disbursedMonth === 'All';

    const params = new URLSearchParams();
    if (state.filters.search) params.append('search', state.filters.search);
    if (state.filters.status && state.filters.status !== 'All') params.append('status', state.filters.status);
    if (state.filters.loanType && state.filters.loanType !== 'All') params.append('loan_type', state.filters.loanType);
    if (state.filters.finance && state.filters.finance !== 'All') params.append('finance_name', state.filters.finance);
    if (state.filters.disbursedMonth && state.filters.disbursedMonth !== 'All') params.append('disbursed_month', state.filters.disbursedMonth);

    const res = await fetch(`/api/leads?${params.toString()}`);
    const data = await res.json();
    if (data.success) {
      state.leads = data.data;
      if (isUnfiltered || state.allLeads.length === 0) {
        state.allLeads = data.data;
      }
      renderTable();
      updateFinanceDropdownOptions();
      updateDisbursedMonthDropdownOptions();
    }
  } catch (err) {
    console.error('Error fetching leads:', err);
    showToast('Failed to load leads from server', 'error');
  }
}

async function fetchAllLeads() {
  try {
    const res = await fetch('/api/leads');
    const data = await res.json();
    if (data.success) {
      state.allLeads = data.data;
    }
  } catch (err) {
    console.error('Error fetching all leads:', err);
  }
}

async function fetchStats() {
  try {
    const res = await fetch('/api/leads/stats');
    const data = await res.json();
    if (data.success) {
      state.stats = data.data;
      renderStats();
    }
  } catch (err) {
    console.error('Error fetching stats:', err);
  }
}

async function fetchNextSerial() {
  try {
    const res = await fetch('/api/leads/next-serial');
    const data = await res.json();
    if (data.success) {
      return data.nextSerial;
    }
  } catch (err) {
    console.error('Error fetching next serial:', err);
  }
  return 'SD-001';
}

function renderStats() {
  const s = state.stats || {};
  elements.statTotalLeads.textContent = s.totalLeads || 0;
  elements.statTotalVolume.textContent = formatShortCurrency(s.totalVolume || 0);

  let inProcessCount = 0;
  let approvedCount = 0;
  let disbursedCount = s.disbursedCount !== undefined ? s.disbursedCount : 0;
  let disbursedAmount = s.disbursedVolume !== undefined ? s.disbursedVolume : 0;

  if (s.byStatus && Array.isArray(s.byStatus)) {
    s.byStatus.forEach(row => {
      if (row.status === 'Logged In' || row.status === 'In Process' || row.status === 'Documents Pending') {
        inProcessCount += row.count;
      } else if (row.status === 'Approved') {
        approvedCount += row.count;
      } else if (row.status === 'Disbursed' && s.disbursedCount === undefined) {
        disbursedCount += row.count;
        disbursedAmount += row.total_amount;
      }
    });
  }

  elements.statInProcess.textContent = inProcessCount;
  elements.statApproved.textContent = approvedCount;
  elements.statDisbursed.textContent = disbursedCount;
  elements.statDisbursedVolume.textContent = formatShortCurrency(disbursedAmount);
  elements.lastUpdatedTime.textContent = `Updated at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function renderTable() {
  const tbody = elements.leadsTableBody;
  tbody.innerHTML = '';

  const count = state.leads.length;
  elements.leadsCountBadge.textContent = `${count} ${count === 1 ? 'lead' : 'leads'}`;
  if (elements.downloadTableCount) {
    elements.downloadTableCount.textContent = count;
  }

  if (count === 0) {
    elements.emptyState.classList.remove('hidden');
    return;
  }
  elements.emptyState.classList.add('hidden');

  state.leads.forEach(lead => {
    const tr = document.createElement('tr');

    // Clean phone for links
    const cleanPhone = (lead.mobile_number || '').replace(/[^0-9]/g, '');
    const waLink = cleanPhone ? `https://wa.me/91${cleanPhone}?text=Hello%20${encodeURIComponent(lead.customer_name)},%20regarding%20your%20${encodeURIComponent(lead.loan_type)}%20loan%20application%20with%20SD%20Associates.` : '#';

    const isDisbursed = lead.status === 'Disbursed';
    const disbAmt = isDisbursed ? (Number(lead.disbursed_amount) || Number(lead.loan_amount) || 0) : 0;

    tr.innerHTML = `
      <td>
        <span class="table-serial">${escapeHtml(lead.serial_no)}</span>
      </td>
      <td>
        <div class="table-customer-name">${escapeHtml(lead.customer_name)}</div>
        <div class="table-customer-phone">
          <span>${escapeHtml(lead.mobile_number)}</span>
          ${cleanPhone ? `
            <a href="tel:${cleanPhone}" class="icon-link phone" title="Call ${lead.customer_name}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </a>
            <a href="${waLink}" target="_blank" class="icon-link whatsapp" title="Chat on WhatsApp">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
          ` : ''}
        </div>
      </td>
      <td>
        <span class="${getLoanTypeBadgeClass(lead.loan_type)}">${escapeHtml(lead.loan_type)}</span>
      </td>
      <td>
        <div class="amount-text">${formatCurrency(lead.loan_amount)}</div>
      </td>
      <td>
        <div class="table-vehicle-model">${escapeHtml(lead.model || '-')} ${lead.variant ? `<span class="table-vehicle-sub">(${escapeHtml(lead.variant)})</span>` : ''}</div>
        <div class="table-vehicle-sub font-mono">${escapeHtml(lead.vehicle_number || 'New')}</div>
      </td>
      <td>
        <span>${escapeHtml(lead.reference_by || '-')}</span>
      </td>
      <td>
        <span class="table-finance">${escapeHtml(lead.finance_name || '-')}</span>
      </td>
      <td>
        <span>${formatDate(lead.login_date)}</span>
      </td>
      <td>
        <div class="amount-text" style="color: ${isDisbursed ? '#15803d' : '#94a3b8'};">
          ${isDisbursed ? formatCurrency(disbAmt) : '-'}
        </div>
      </td>
      <td>
        <span style="font-size: 0.8rem; color: ${isDisbursed ? '#1e293b' : '#94a3b8'};">
          ${isDisbursed && lead.disbursed_date ? formatDate(lead.disbursed_date) : '-'}
        </span>
      </td>
      <td>
        <span class="${getStatusBadgeClass(lead.status)}">${escapeHtml(lead.status)}</span>
      </td>
      <td class="text-right">
        <div class="table-row-actions">
          <button class="btn-table-action btn-view-lead" data-id="${lead.id}" title="View Details">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            View
          </button>
          <button class="btn-table-action btn-table-edit" data-id="${lead.id}" title="Edit / Re-entry Lead">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit
          </button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function updateFinanceDropdownOptions() {
  const select = elements.filterFinance;
  const currentVal = select.value;
  
  // Extract unique finance companies
  const financeSet = new Set();
  const source = (state.allLeads && state.allLeads.length > 0) ? state.allLeads : state.leads;
  source.forEach(l => {
    if (l.finance_name && l.finance_name.trim()) {
      financeSet.add(l.finance_name.trim());
    }
  });

  const sortedList = Array.from(financeSet).sort();
  select.innerHTML = '<option value="All">All Finance Companies</option>';
  sortedList.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    select.appendChild(opt);
  });

  if (sortedList.includes(currentVal)) {
    select.value = currentVal;
  }
}

function updateDisbursedMonthDropdownOptions() {
  if (!elements.filterDisbursedMonth) return;
  const select = elements.filterDisbursedMonth;
  const currentVal = state.filters.disbursedMonth || select.value;

  const monthsSet = new Set();
  const source = (state.allLeads && state.allLeads.length > 0) ? state.allLeads : state.leads;
  source.forEach(l => {
    if (l.disbursed_date && l.disbursed_date.length >= 7) {
      const ym = l.disbursed_date.substring(0, 7);
      monthsSet.add(ym);
    }
  });

  const sortedMonths = Array.from(monthsSet).sort().reverse();
  select.innerHTML = '<option value="All">All Disbursed Months</option>';
  sortedMonths.forEach(ym => {
    const parts = ym.split('-');
    let label = ym;
    if (parts.length === 2) {
      const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, 1);
      label = d.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
    }
    const opt = document.createElement('option');
    opt.value = ym;
    opt.textContent = `${label} (${ym})`;
    select.appendChild(opt);
  });

  if (currentVal && (currentVal === 'All' || sortedMonths.includes(currentVal))) {
    select.value = currentVal;
  }
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function toggleDisbursedFields(status) {
  if (!elements.disbursedSection) return;
  const isDisbursed = status === 'Disbursed';
  elements.disbursedSection.classList.toggle('hidden', !isDisbursed);

  if (isDisbursed) {
    if (!elements.disbursedDate.value) {
      elements.disbursedDate.value = new Date().toISOString().slice(0, 10);
    }
    if (!elements.disbursedAmount.value && elements.loanAmount.value) {
      elements.disbursedAmount.value = elements.loanAmount.value;
    }
  }
}

// Modal Handlers
async function openCreateLeadModal() {
  state.currentEditingId = null;
  elements.leadForm.reset();
  elements.leadId.value = '';

  // Set next numeric serial number automatically
  const nextSerial = await fetchNextSerial();
  elements.serialNo.value = nextSerial;

  // Default login date to today
  elements.loginDate.value = new Date().toISOString().slice(0, 10);
  elements.status.value = 'Logged In';
  elements.loanType.value = 'New Car';

  // Reset disbursed fields
  elements.disbursedAmount.value = '';
  elements.disbursedDate.value = '';
  elements.rtoAmount.value = '';
  elements.rtoName.value = '';
  elements.sellerAmount.value = '';
  elements.sellerName.value = '';
  elements.sellerDate.value = '';
  elements.utrNo.value = '';

  toggleDisbursedFields('Logged In');

  elements.formModalTitle.textContent = 'New Lead Entry Form';
  elements.formModalSubtitle.textContent = 'Enter customer and vehicle finance details';
  elements.saveBtnText.textContent = 'Save Lead Entry';
  elements.editModeBanner.classList.add('hidden');

  elements.leadFormModal.classList.remove('hidden');
  elements.customerName.focus();
}

function openEditLeadModal(lead) {
  state.currentEditingId = lead.id;
  elements.leadForm.reset();

  // Populate fields
  elements.leadId.value = lead.id;
  elements.serialNo.value = lead.serial_no || '';
  elements.customerName.value = lead.customer_name || '';
  elements.mobileNumber.value = lead.mobile_number || '';
  elements.loanType.value = lead.loan_type || 'New Car';
  elements.loanAmount.value = lead.loan_amount || '';
  elements.vehicleNumber.value = lead.vehicle_number || '';
  elements.model.value = lead.model || '';
  elements.variant.value = lead.variant || '';
  elements.referenceBy.value = lead.reference_by || '';
  elements.financeName.value = lead.finance_name || '';
  elements.loginDate.value = lead.login_date || new Date().toISOString().slice(0, 10);
  elements.status.value = lead.status || 'Logged In';
  elements.notes.value = lead.notes || '';

  // Disbursed fields
  elements.disbursedAmount.value = lead.disbursed_amount || lead.loan_amount || '';
  elements.disbursedDate.value = lead.disbursed_date || '';
  elements.rtoAmount.value = lead.rto_amount || '';
  elements.rtoName.value = lead.rto_name || '';
  elements.sellerAmount.value = lead.seller_amount || '';
  elements.sellerName.value = lead.seller_name || '';
  elements.sellerDate.value = lead.seller_date || '';
  elements.utrNo.value = lead.utr_no || '';

  toggleDisbursedFields(lead.status);

  // Show re-entry styling & banner
  elements.formModalTitle.textContent = `Edit / Re-entry Form: ${lead.customer_name}`;
  elements.formModalSubtitle.textContent = `Sl. No: ${lead.serial_no} • Modify details and re-submit`;
  elements.saveBtnText.textContent = 'Update Lead Details';
  elements.editModeBanner.classList.remove('hidden');

  // Close view modal if opened
  elements.viewDetailsModal.classList.add('hidden');
  elements.leadFormModal.classList.remove('hidden');
}

function openViewDetailsModal(lead) {
  state.currentViewingLead = lead;

  elements.viewCustomerName.textContent = lead.customer_name || '-';
  elements.viewSerialNo.textContent = `Sl. No: ${lead.serial_no} • Registered on ${formatDate(lead.login_date)}`;
  
  elements.viewStatusBadge.textContent = lead.status || 'Logged In';
  elements.viewStatusBadge.className = getStatusBadgeClass(lead.status);

  elements.viewLoanType.textContent = lead.loan_type || '-';
  elements.viewLoanAmount.textContent = formatCurrency(lead.loan_amount);
  elements.viewFinanceName.textContent = lead.finance_name || 'Not Assigned';
  elements.viewLoginDate.textContent = formatDate(lead.login_date);
  elements.viewStatus.textContent = lead.status || '-';

  const isDisbursed = lead.status === 'Disbursed';
  elements.viewDisbursedAmount.textContent = isDisbursed ? formatCurrency(lead.disbursed_amount || lead.loan_amount) : '-';
  elements.viewDisbursedDate.textContent = isDisbursed && lead.disbursed_date ? formatDate(lead.disbursed_date) : '-';
  elements.viewUtrNo.textContent = isDisbursed && lead.utr_no ? lead.utr_no : '-';
  elements.viewRtoAmount.textContent = isDisbursed && lead.rto_amount ? formatCurrency(lead.rto_amount) : '-';
  elements.viewRtoName.textContent = isDisbursed && lead.rto_name ? lead.rto_name : '-';
  elements.viewSellerAmount.textContent = isDisbursed && lead.seller_amount ? formatCurrency(lead.seller_amount) : '-';
  elements.viewSellerName.textContent = isDisbursed && lead.seller_name ? lead.seller_name : '-';
  elements.viewSellerDate.textContent = isDisbursed && lead.seller_date ? formatDate(lead.seller_date) : '-';

  elements.viewVehicleNumber.textContent = lead.vehicle_number || 'New / Unregistered';
  elements.viewModel.textContent = lead.model || '-';
  elements.viewVariant.textContent = lead.variant || 'Standard';
  elements.viewMobileNumber.textContent = lead.mobile_number || '-';
  elements.viewReferenceBy.textContent = lead.reference_by || 'Direct / Walk-in';
  elements.viewNotes.textContent = lead.notes && lead.notes.trim() ? lead.notes : 'No additional notes added.';

  // Quick Action Buttons
  const cleanPhone = (lead.mobile_number || '').replace(/[^0-9]/g, '');
  if (cleanPhone) {
    elements.btnQuickCall.href = `tel:${cleanPhone}`;
    elements.btnQuickCall.style.display = 'inline-flex';

    const waText = encodeURIComponent(`Hello ${lead.customer_name}, regards from SD Associates regarding your ${lead.loan_type} loan for ${lead.model}. Current Status: ${lead.status}.`);
    elements.btnQuickWhatsapp.href = `https://wa.me/91${cleanPhone}?text=${waText}`;
    elements.btnQuickWhatsapp.style.display = 'inline-flex';
  } else {
    elements.btnQuickCall.style.display = 'none';
    elements.btnQuickWhatsapp.style.display = 'none';
  }

  elements.viewDetailsModal.classList.remove('hidden');
}

function closeModals() {
  if (elements.leadFormModal) elements.leadFormModal.classList.add('hidden');
  if (elements.viewDetailsModal) elements.viewDetailsModal.classList.add('hidden');
  if (elements.downloadModal) elements.downloadModal.classList.add('hidden');
  if (elements.insuranceFormModal) elements.insuranceFormModal.classList.add('hidden');
  if (elements.viewInsuranceModal) elements.viewInsuranceModal.classList.add('hidden');
  if (elements.insuranceDownloadModal) elements.insuranceDownloadModal.classList.add('hidden');
}

// Form Submission
async function handleLeadFormSubmit(e) {
  e.preventDefault();

  const isDisbursed = elements.status.value === 'Disbursed';

  const formData = {
    serial_no: elements.serialNo.value.trim(),
    customer_name: elements.customerName.value.trim(),
    mobile_number: elements.mobileNumber.value.trim(),
    loan_type: elements.loanType.value,
    loan_amount: parseFloat(elements.loanAmount.value) || 0,
    vehicle_number: elements.vehicleNumber.value.trim(),
    model: elements.model.value.trim(),
    variant: elements.variant.value.trim(),
    reference_by: elements.referenceBy.value.trim(),
    finance_name: elements.financeName.value.trim(),
    login_date: elements.loginDate.value,
    status: elements.status.value,
    disbursed_amount: isDisbursed ? (parseFloat(elements.disbursedAmount.value) || parseFloat(elements.loanAmount.value) || 0) : 0,
    disbursed_date: isDisbursed ? elements.disbursedDate.value : '',
    utr_no: isDisbursed ? elements.utrNo.value.trim() : '',
    rto_amount: isDisbursed ? (parseFloat(elements.rtoAmount.value) || 0) : 0,
    rto_name: isDisbursed ? elements.rtoName.value.trim() : '',
    seller_amount: isDisbursed ? (parseFloat(elements.sellerAmount.value) || 0) : 0,
    seller_name: isDisbursed ? elements.sellerName.value.trim() : '',
    seller_date: isDisbursed ? elements.sellerDate.value : '',
    notes: elements.notes.value.trim()
  };

  if (!formData.customer_name || !formData.mobile_number) {
    showToast('Customer Name and Mobile Number are required', 'error');
    return;
  }

  try {
    const isEditing = Boolean(state.currentEditingId);
    const url = isEditing ? `/api/leads/${state.currentEditingId}` : '/api/leads';
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await res.json();
    if (result.success) {
      showToast(isEditing ? 'Lead updated successfully!' : 'New lead entered successfully!', 'success');
      closeModals();
      await fetchLeads();
      await fetchStats();
    } else {
      showToast(result.error || 'Failed to save lead', 'error');
    }
  } catch (err) {
    console.error('Error saving lead:', err);
    showToast('Network error while saving lead', 'error');
  }
}

// Delete Lead
async function handleDeleteLead(id) {
  if (!confirm('Are you sure you want to permanently delete this lead record? This cannot be undone.')) {
    return;
  }

  try {
    const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
      showToast('Lead deleted successfully', 'success');
      closeModals();
      await fetchLeads();
      await fetchStats();
    } else {
      showToast(result.error || 'Failed to delete lead', 'error');
    }
  } catch (err) {
    console.error('Error deleting lead:', err);
    showToast('Error deleting lead', 'error');
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Open / Close Form Modal
  elements.btnOpenNewLead.addEventListener('click', openCreateLeadModal);
  elements.btnEmptyAddLead.addEventListener('click', openCreateLeadModal);
  elements.btnCloseFormModal.addEventListener('click', closeModals);
  elements.btnCancelForm.addEventListener('click', closeModals);
  elements.btnCloseViewModal.addEventListener('click', closeModals);
  elements.btnCloseViewBottom.addEventListener('click', closeModals);

  // Auto Serial
  elements.btnAutoSerial.addEventListener('click', async () => {
    const next = await fetchNextSerial();
    elements.serialNo.value = next;
    showToast(`Generated Serial: ${next}`, 'success');
  });

  // Amount Chips
  document.querySelectorAll('.amount-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const targetId = chip.getAttribute('data-target');
      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) targetEl.value = chip.getAttribute('data-amt');
      } else if (elements.loanAmount) {
        elements.loanAmount.value = chip.getAttribute('data-amt');
      }
    });
  });

  // Submit Form
  elements.leadForm.addEventListener('submit', handleLeadFormSubmit);

  // Table Actions (Delegation)
  elements.leadsTableBody.addEventListener('click', (e) => {
    const viewBtn = e.target.closest('.btn-view-lead');
    if (viewBtn) {
      const id = parseInt(viewBtn.getAttribute('data-id'), 10);
      const lead = state.leads.find(l => l.id === id);
      if (lead) openViewDetailsModal(lead);
      return;
    }

    const editBtn = e.target.closest('.btn-table-edit');
    if (editBtn) {
      const id = parseInt(editBtn.getAttribute('data-id'), 10);
      const lead = state.leads.find(l => l.id === id);
      if (lead) openEditLeadModal(lead);
      return;
    }
  });

  // Edit from View Modal
  elements.btnEditFromView.addEventListener('click', () => {
    if (state.currentViewingLead) {
      openEditLeadModal(state.currentViewingLead);
    }
  });
  elements.btnEditLeadDirect.addEventListener('click', () => {
    if (state.currentViewingLead) {
      openEditLeadModal(state.currentViewingLead);
    }
  });

  // Delete from View Modal
  elements.btnDeleteLead.addEventListener('click', () => {
    if (state.currentViewingLead) {
      handleDeleteLead(state.currentViewingLead.id);
    }
  });

  // Print Slip
  elements.btnPrintSlip.addEventListener('click', () => {
    window.print();
  });

  // Search Input with Debounce
  let searchTimeout = null;
  elements.searchInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    elements.btnClearSearch.classList.toggle('hidden', !val);

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      state.filters.search = val;
      fetchLeads();
    }, 250);
  });

  elements.btnClearSearch.addEventListener('click', () => {
    elements.searchInput.value = '';
    elements.btnClearSearch.classList.add('hidden');
    state.filters.search = '';
    fetchLeads();
  });

  // Status Tabs
  elements.statusTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab');
    if (!tab) return;

    elements.statusTabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    state.filters.status = tab.getAttribute('data-status');
    fetchLeads();
  });

  // Loan Type Filter
  elements.filterLoanType.addEventListener('change', (e) => {
    state.filters.loanType = e.target.value;
    fetchLeads();
  });

  // Finance Company Filter
  elements.filterFinance.addEventListener('change', (e) => {
    state.filters.finance = e.target.value;
    fetchLeads();
  });

  // Reset Filters
  elements.btnResetFilters.addEventListener('click', () => {
    elements.searchInput.value = '';
    elements.btnClearSearch.classList.add('hidden');
    elements.filterLoanType.value = 'All';
    elements.filterFinance.value = 'All';
    if (elements.filterDisbursedMonth) elements.filterDisbursedMonth.value = 'All';

    elements.statusTabs.querySelectorAll('.tab').forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-status') === 'All');
    });

    state.filters = {
      search: '',
      status: 'All',
      loanType: 'All',
      finance: 'All',
      disbursedMonth: 'All'
    };

    fetchLeads();
  });

  // Disbursed Month Toolbar Filter Listener
  if (elements.filterDisbursedMonth) {
    elements.filterDisbursedMonth.addEventListener('change', (e) => {
      state.filters.disbursedMonth = e.target.value;
      fetchLeads();
    });
  }

  // Refresh
  elements.btnRefresh.addEventListener('click', async () => {
    await fetchLeads();
    await fetchStats();
    showToast('Directory refreshed', 'success');
  });

  // Download Modal Logic & Handlers
  async function openDownloadModal() {
    await fetchAllLeads();

    // Pre-select filters based on current table filter state
    state.exportFilter.status = (state.filters.status && state.filters.status !== 'All') ? state.filters.status : 'All';
    state.exportFilter.loanType = (state.filters.loanType && state.filters.loanType !== 'All') ? state.filters.loanType : 'All';
    state.exportFilter.finance = (state.filters.finance && state.filters.finance !== 'All') ? state.filters.finance : 'All';
    state.exportFilter.disbursedMonth = (state.filters.disbursedMonth && state.filters.disbursedMonth !== 'All') ? state.filters.disbursedMonth : '';
    state.exportFilter.dateRange = 'all';
    state.exportFilter.fromDate = '';
    state.exportFilter.toDate = '';

    // Update UI pills
    elements.exportStatusOptions.querySelectorAll('.pill-option').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-val') === state.exportFilter.status);
    });

    elements.exportLoanTypeOptions.querySelectorAll('.pill-option').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-val') === state.exportFilter.loanType);
    });

    populateExportFinanceSelect();

    if (elements.exportDisbursedMonth) {
      elements.exportDisbursedMonth.value = state.exportFilter.disbursedMonth || '';
    }

    elements.exportDateRange.value = 'all';
    elements.exportCustomDateRow.classList.add('hidden');
    elements.exportFromDate.value = '';
    elements.exportToDate.value = '';

    updateExportPreview();
    elements.downloadModal.classList.remove('hidden');
  }

  function populateExportFinanceSelect() {
    const sel = elements.exportFinanceSelect;
    const curr = state.exportFilter.finance;
    const financeSet = new Set();
    const source = (state.allLeads && state.allLeads.length > 0) ? state.allLeads : state.leads;
    source.forEach(l => {
      if (l.finance_name && l.finance_name.trim()) financeSet.add(l.finance_name.trim());
    });

    sel.innerHTML = '<option value="All">All Finance Companies</option>';
    Array.from(financeSet).sort().forEach(name => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      sel.appendChild(opt);
    });
    sel.value = curr || 'All';
  }

  function updateExportPreview() {
    const source = (state.allLeads && state.allLeads.length > 0) ? state.allLeads : state.leads;

    const filtered = source.filter(lead => {
      // 1. Status Filter
      if (state.exportFilter.status !== 'All' && lead.status !== state.exportFilter.status) {
        return false;
      }
      // 2. Loan Type Filter
      if (state.exportFilter.loanType !== 'All' && lead.loan_type !== state.exportFilter.loanType) {
        return false;
      }
      // 3. Finance Partner Filter
      if (state.exportFilter.finance !== 'All' && lead.finance_name !== state.exportFilter.finance) {
        return false;
      }
      // 4. Month-Wise Filter by Disbursed Date (Strictly based on disbursed_date, not login date)
      if (state.exportFilter.disbursedMonth) {
        if (!lead.disbursed_date || !lead.disbursed_date.startsWith(state.exportFilter.disbursedMonth)) {
          return false;
        }
      }
      // 5. Custom Disbursed Date Range Filter
      if (state.exportFilter.dateRange === 'custom') {
        if (state.exportFilter.fromDate && (!lead.disbursed_date || lead.disbursed_date < state.exportFilter.fromDate)) return false;
        if (state.exportFilter.toDate && (!lead.disbursed_date || lead.disbursed_date > state.exportFilter.toDate)) return false;
      }

      return true;
    });

    const isDisbursedOnly = state.exportFilter.status === 'Disbursed' || Boolean(state.exportFilter.disbursedMonth);
    const totalVolume = filtered.reduce((sum, l) => {
      if (isDisbursedOnly) {
        return sum + (Number(l.disbursed_amount) || Number(l.loan_amount) || 0);
      }
      return sum + (Number(l.loan_amount) || 0);
    }, 0);

    elements.exportMatchCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'lead' : 'leads'}`;
    elements.exportMatchVolume.textContent = formatCurrency(totalVolume);

    // Filename preview
    const parts = ['SD_Associates'];
    if (state.exportFilter.disbursedMonth) {
      parts.push(`DisbursedMonth_${state.exportFilter.disbursedMonth.replace('-', '_')}`);
    }
    if (state.exportFilter.status !== 'All') {
      parts.push(state.exportFilter.status.replace(/[^a-zA-Z0-9]/g, '_'));
    }
    if (state.exportFilter.loanType !== 'All') {
      parts.push(state.exportFilter.loanType.replace(/[^a-zA-Z0-9]/g, '_'));
    }
    if (state.exportFilter.finance !== 'All') {
      parts.push(state.exportFilter.finance.replace(/[^a-zA-Z0-9]/g, '_'));
    }
    parts.push('Report');
    elements.exportPreviewFilename.textContent = `${parts.join('_')}.csv`;
  }

  function executeDownloadReport() {
    const params = new URLSearchParams();
    if (state.exportFilter.status && state.exportFilter.status !== 'All') {
      params.append('status', state.exportFilter.status);
    }
    if (state.exportFilter.loanType && state.exportFilter.loanType !== 'All') {
      params.append('loan_type', state.exportFilter.loanType);
    }
    if (state.exportFilter.finance && state.exportFilter.finance !== 'All') {
      params.append('finance_name', state.exportFilter.finance);
    }
    if (state.exportFilter.disbursedMonth) {
      params.append('disbursed_month', state.exportFilter.disbursedMonth);
    }
    if (state.exportFilter.dateRange === 'custom') {
      if (state.exportFilter.fromDate) params.append('disbursed_from', state.exportFilter.fromDate);
      if (state.exportFilter.toDate) params.append('disbursed_to', state.exportFilter.toDate);
    }

    window.location.href = `/api/export?${params.toString()}`;
    showToast(`Downloading report (${state.exportFilter.status} - ${state.exportFilter.loanType})`, 'success');
    closeModals();
  }

  // Open & Close Download Modal
  if (elements.btnOpenDownloadModal) {
    elements.btnOpenDownloadModal.addEventListener('click', openDownloadModal);
  }
  if (elements.btnCloseDownloadModal) {
    elements.btnCloseDownloadModal.addEventListener('click', closeModals);
  }
  if (elements.btnCancelDownload) {
    elements.btnCancelDownload.addEventListener('click', closeModals);
  }
  if (elements.btnExecuteDownload) {
    elements.btnExecuteDownload.addEventListener('click', executeDownloadReport);
  }

  // Download PDF (Table Format) Button
  if (elements.btnExecuteDownloadPdf) {
    elements.btnExecuteDownloadPdf.addEventListener('click', () => {
      const params = new URLSearchParams();
      if (state.exportFilter.status && state.exportFilter.status !== 'All') {
        params.append('status', state.exportFilter.status);
      }
      if (state.exportFilter.loanType && state.exportFilter.loanType !== 'All') {
        params.append('loan_type', state.exportFilter.loanType);
      }
      if (state.exportFilter.finance && state.exportFilter.finance !== 'All') {
        params.append('finance_name', state.exportFilter.finance);
      }
      if (state.exportFilter.disbursedMonth) {
        params.append('disbursed_month', state.exportFilter.disbursedMonth);
      }
      if (state.exportFilter.dateRange === 'custom') {
        if (state.exportFilter.fromDate) params.append('disbursed_from', state.exportFilter.fromDate);
        if (state.exportFilter.toDate) params.append('disbursed_to', state.exportFilter.toDate);
      }
      params.append('autoprint', '1');

      window.open(`/report?${params.toString()}`, '_blank');
      showToast('Opening PDF Table Report for Download / Print...', 'success');
      closeModals();
    });
  }

  // Status Change Listener in Lead Form (toggles 3 disbursed fields)
  if (elements.status) {
    elements.status.addEventListener('change', (e) => {
      toggleDisbursedFields(e.target.value);
    });
  }

  // Loan Amount change syncs with Disbursed Amount if disbursed
  if (elements.loanAmount) {
    elements.loanAmount.addEventListener('input', () => {
      if (elements.status.value === 'Disbursed' && (!elements.disbursedAmount.value || elements.disbursedAmount.value === '0')) {
        elements.disbursedAmount.value = elements.loanAmount.value;
      }
    });
  }

  // Status Filter Pill Selection inside Download Modal
  if (elements.exportStatusOptions) {
    elements.exportStatusOptions.addEventListener('click', (e) => {
      const pill = e.target.closest('.pill-option');
      if (!pill) return;
      elements.exportStatusOptions.querySelectorAll('.pill-option').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.exportFilter.status = pill.getAttribute('data-val');
      updateExportPreview();
    });
  }

  // Loan Type Filter Pill Selection inside Download Modal
  if (elements.exportLoanTypeOptions) {
    elements.exportLoanTypeOptions.addEventListener('click', (e) => {
      const pill = e.target.closest('.pill-option');
      if (!pill) return;
      elements.exportLoanTypeOptions.querySelectorAll('.pill-option').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.exportFilter.loanType = pill.getAttribute('data-val');
      updateExportPreview();
    });
  }

  // Finance Select in Download Modal
  if (elements.exportFinanceSelect) {
    elements.exportFinanceSelect.addEventListener('change', (e) => {
      state.exportFilter.finance = e.target.value;
      updateExportPreview();
    });
  }

  // Date Range Select in Download Modal
  if (elements.exportDateRange) {
    elements.exportDateRange.addEventListener('change', (e) => {
      state.exportFilter.dateRange = e.target.value;
      if (state.exportFilter.dateRange === 'custom') {
        elements.exportCustomDateRow.classList.remove('hidden');
      } else {
        elements.exportCustomDateRow.classList.add('hidden');
      }
      updateExportPreview();
    });
  }

  if (elements.exportFromDate) {
    elements.exportFromDate.addEventListener('change', (e) => {
      state.exportFilter.fromDate = e.target.value;
      updateExportPreview();
    });
  }

  if (elements.exportToDate) {
    elements.exportToDate.addEventListener('change', (e) => {
      state.exportFilter.toDate = e.target.value;
      updateExportPreview();
    });
  }

  // Month-Wise Export Filter Listeners
  if (elements.exportDisbursedMonth) {
    elements.exportDisbursedMonth.addEventListener('input', (e) => {
      state.exportFilter.disbursedMonth = e.target.value;
      updateExportPreview();
    });
    elements.exportDisbursedMonth.addEventListener('change', (e) => {
      state.exportFilter.disbursedMonth = e.target.value;
      updateExportPreview();
    });
  }

  if (elements.btnExportThisMonth) {
    elements.btnExportThisMonth.addEventListener('click', () => {
      const currentMonth = new Date().toISOString().slice(0, 7);
      if (elements.exportDisbursedMonth) elements.exportDisbursedMonth.value = currentMonth;
      state.exportFilter.disbursedMonth = currentMonth;
      updateExportPreview();
    });
  }

  if (elements.btnExportAllMonths) {
    elements.btnExportAllMonths.addEventListener('click', () => {
      if (elements.exportDisbursedMonth) elements.exportDisbursedMonth.value = '';
      state.exportFilter.disbursedMonth = '';
      updateExportPreview();
    });
  }

  // Quick Download Filtered Table button
  if (elements.btnQuickDownloadFiltered) {
    elements.btnQuickDownloadFiltered.addEventListener('click', () => {
      const params = new URLSearchParams();
      if (state.filters.search) params.append('search', state.filters.search);
      if (state.filters.status && state.filters.status !== 'All') params.append('status', state.filters.status);
      if (state.filters.loanType && state.filters.loanType !== 'All') params.append('loan_type', state.filters.loanType);
      if (state.filters.finance && state.filters.finance !== 'All') params.append('finance_name', state.filters.finance);
      if (state.filters.disbursedMonth && state.filters.disbursedMonth !== 'All') params.append('disbursed_month', state.filters.disbursedMonth);

      window.location.href = `/api/export?${params.toString()}`;
      showToast('Downloading current table view...', 'success');
    });
  }

  // ==============================================
  // CRM MODULE SWITCHER EVENT LISTENERS
  // ==============================================

  if (elements.btnSwitchFinance) {
    elements.btnSwitchFinance.addEventListener('click', () => switchCrm('finance'));
  }

  if (elements.btnSwitchInsurance) {
    elements.btnSwitchInsurance.addEventListener('click', () => switchCrm('insurance'));
  }

  if (elements.btnBannerViewExpiring) {
    elements.btnBannerViewExpiring.addEventListener('click', () => {
      // Activate Expiring Soon tab in Insurance CRM
      if (elements.insuranceStatusTabs) {
        elements.insuranceStatusTabs.querySelectorAll('.tab').forEach(t => {
          t.classList.toggle('active', t.getAttribute('data-status') === 'Expiring Soon');
        });
      }
      state.insuranceFilters.status = 'Expiring Soon';
      fetchInsurancePolicies();
    });
  }

  // ==============================================
  // INSURANCE TOOLBAR & FILTER LISTENERS
  // ==============================================

  if (elements.insuranceSearchInput) {
    elements.insuranceSearchInput.addEventListener('input', (e) => {
      state.insuranceFilters.search = e.target.value;
      if (elements.btnClearInsuranceSearch) {
        elements.btnClearInsuranceSearch.classList.toggle('hidden', !e.target.value);
      }
      debounce(() => fetchInsurancePolicies(), 300)();
    });
  }

  if (elements.btnClearInsuranceSearch) {
    elements.btnClearInsuranceSearch.addEventListener('click', () => {
      elements.insuranceSearchInput.value = '';
      state.insuranceFilters.search = '';
      elements.btnClearInsuranceSearch.classList.add('hidden');
      fetchInsurancePolicies();
      elements.insuranceSearchInput.focus();
    });
  }

  if (elements.insuranceStatusTabs) {
    elements.insuranceStatusTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab');
      if (!tab) return;
      elements.insuranceStatusTabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.insuranceFilters.status = tab.getAttribute('data-status');
      fetchInsurancePolicies();
    });
  }

  if (elements.filterInsuranceCompany) {
    elements.filterInsuranceCompany.addEventListener('change', (e) => {
      state.insuranceFilters.insuranceCompany = e.target.value;
      fetchInsurancePolicies();
    });
  }

  if (elements.filterInsuranceType) {
    elements.filterInsuranceType.addEventListener('change', (e) => {
      state.insuranceFilters.loanType = e.target.value;
      fetchInsurancePolicies();
    });
  }

  if (elements.filterInsuranceExpiryMonth) {
    elements.filterInsuranceExpiryMonth.addEventListener('change', (e) => {
      state.insuranceFilters.expiryMonth = e.target.value;
      fetchInsurancePolicies();
    });
  }

  if (elements.btnResetInsuranceFilters) {
    elements.btnResetInsuranceFilters.addEventListener('click', () => {
      if (elements.insuranceSearchInput) elements.insuranceSearchInput.value = '';
      if (elements.btnClearInsuranceSearch) elements.btnClearInsuranceSearch.classList.add('hidden');
      if (elements.filterInsuranceCompany) elements.filterInsuranceCompany.value = 'All';
      if (elements.filterInsuranceType) elements.filterInsuranceType.value = 'All';
      if (elements.filterInsuranceExpiryMonth) elements.filterInsuranceExpiryMonth.value = '';

      if (elements.insuranceStatusTabs) {
        elements.insuranceStatusTabs.querySelectorAll('.tab').forEach((t, i) => {
          t.classList.toggle('active', i === 0);
        });
      }

      state.insuranceFilters = {
        search: '',
        status: 'All',
        insuranceCompany: 'All',
        loanType: 'All',
        expiryMonth: ''
      };

      fetchInsurancePolicies();
    });
  }

  if (elements.btnRefreshInsurance) {
    elements.btnRefreshInsurance.addEventListener('click', async () => {
      await fetchInsurancePolicies();
      await fetchInsuranceStats();
      showToast('Insurance directory refreshed', 'success');
    });
  }

  if (elements.btnQuickDownloadInsuranceFiltered) {
    elements.btnQuickDownloadInsuranceFiltered.addEventListener('click', () => {
      const params = new URLSearchParams();
      if (state.insuranceFilters.search) params.append('search', state.insuranceFilters.search);
      if (state.insuranceFilters.status && state.insuranceFilters.status !== 'All') params.append('status', state.insuranceFilters.status);
      if (state.insuranceFilters.insuranceCompany && state.insuranceFilters.insuranceCompany !== 'All') params.append('insurance_company', state.insuranceFilters.insuranceCompany);
      if (state.insuranceFilters.loanType && state.insuranceFilters.loanType !== 'All') params.append('loan_type', state.insuranceFilters.loanType);
      if (state.insuranceFilters.expiryMonth) params.append('expiry_month', state.insuranceFilters.expiryMonth);

      window.location.href = `/api/insurance/export?${params.toString()}`;
      showToast('Downloading insurance table CSV...', 'success');
    });
  }

  // ==============================================
  // INSURANCE MODAL & FORM LISTENERS
  // ==============================================

  if (elements.btnOpenNewInsurance) {
    elements.btnOpenNewInsurance.addEventListener('click', openNewInsuranceModal);
  }

  if (elements.btnEmptyAddInsurance) {
    elements.btnEmptyAddInsurance.addEventListener('click', openNewInsuranceModal);
  }

  if (elements.btnCloseInsuranceFormModal) {
    elements.btnCloseInsuranceFormModal.addEventListener('click', closeModals);
  }

  if (elements.btnCancelInsuranceForm) {
    elements.btnCancelInsuranceForm.addEventListener('click', closeModals);
  }

  if (elements.btnAutoInsuranceSerial) {
    elements.btnAutoInsuranceSerial.addEventListener('click', async () => {
      try {
        const res = await fetch('/api/insurance/next-serial');
        const data = await res.json();
        if (data.success && elements.insuranceSerialNo) {
          elements.insuranceSerialNo.value = data.nextSerial;
          showToast(`Assigned Sl. No ${data.nextSerial}`, 'info');
        }
      } catch (e) {
        // ignore
      }
    });
  }

  if (elements.insuranceToDate) {
    elements.insuranceToDate.addEventListener('input', (e) => {
      updateInsuranceFormExpiryPreview(e.target.value);
    });
    elements.insuranceToDate.addEventListener('change', (e) => {
      updateInsuranceFormExpiryPreview(e.target.value);
    });
  }

  if (elements.insuranceForm) {
    elements.insuranceForm.addEventListener('submit', handleInsuranceFormSubmit);
  }

  // View Insurance Modal Listeners
  if (elements.btnCloseViewInsuranceModal) {
    elements.btnCloseViewInsuranceModal.addEventListener('click', closeModals);
  }

  if (elements.btnCloseViewInsuranceBtn) {
    elements.btnCloseViewInsuranceBtn.addEventListener('click', closeModals);
  }

  if (elements.btnEditFromInsuranceView) {
    elements.btnEditFromInsuranceView.addEventListener('click', () => {
      if (state.currentViewingInsurance) {
        closeModals();
        openEditInsuranceModal(state.currentViewingInsurance);
      }
    });
  }

  if (elements.btnPrintInsuranceSlip) {
    elements.btnPrintInsuranceSlip.addEventListener('click', () => {
      window.print();
    });
  }

  if (elements.btnDeleteFromInsuranceView) {
    elements.btnDeleteFromInsuranceView.addEventListener('click', async () => {
      if (state.currentViewingInsurance) {
        const id = state.currentViewingInsurance.id;
        closeModals();
        await window.handleDeleteInsuranceClick(id);
      }
    });
  }

  // Insurance Download Modal Listeners
  if (elements.btnOpenInsuranceDownload) {
    elements.btnOpenInsuranceDownload.addEventListener('click', openInsuranceDownloadModal);
  }

  if (elements.btnCloseInsuranceDownloadModal) {
    elements.btnCloseInsuranceDownloadModal.addEventListener('click', closeModals);
  }

  if (elements.btnCancelInsuranceDownload) {
    elements.btnCancelInsuranceDownload.addEventListener('click', closeModals);
  }

  if (elements.exportInsStatusOptions) {
    elements.exportInsStatusOptions.addEventListener('click', (e) => {
      const btn = e.target.closest('.pill-option');
      if (!btn) return;
      elements.exportInsStatusOptions.querySelectorAll('.pill-option').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.insuranceExportFilter.status = btn.getAttribute('data-val');
      updateInsuranceExportPreview();
    });
  }

  if (elements.exportInsTypeOptions) {
    elements.exportInsTypeOptions.addEventListener('click', (e) => {
      const btn = e.target.closest('.pill-option');
      if (!btn) return;
      elements.exportInsTypeOptions.querySelectorAll('.pill-option').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.insuranceExportFilter.loanType = btn.getAttribute('data-val');
      updateInsuranceExportPreview();
    });
  }

  if (elements.exportInsExpiryMonth) {
    elements.exportInsExpiryMonth.addEventListener('input', (e) => {
      state.insuranceExportFilter.expiryMonth = e.target.value;
      updateInsuranceExportPreview();
    });
    elements.exportInsExpiryMonth.addEventListener('change', (e) => {
      state.insuranceExportFilter.expiryMonth = e.target.value;
      updateInsuranceExportPreview();
    });
  }

  if (elements.btnExportInsThisMonth) {
    elements.btnExportInsThisMonth.addEventListener('click', () => {
      const currentMonth = new Date().toISOString().slice(0, 7);
      if (elements.exportInsExpiryMonth) elements.exportInsExpiryMonth.value = currentMonth;
      state.insuranceExportFilter.expiryMonth = currentMonth;
      updateInsuranceExportPreview();
    });
  }

  if (elements.btnExportInsNextMonth) {
    elements.btnExportInsNextMonth.addEventListener('click', () => {
      const now = new Date();
      now.setMonth(now.getMonth() + 1);
      const nextMonth = now.toISOString().slice(0, 7);
      if (elements.exportInsExpiryMonth) elements.exportInsExpiryMonth.value = nextMonth;
      state.insuranceExportFilter.expiryMonth = nextMonth;
      updateInsuranceExportPreview();
    });
  }

  if (elements.btnExportInsAllMonths) {
    elements.btnExportInsAllMonths.addEventListener('click', () => {
      if (elements.exportInsExpiryMonth) elements.exportInsExpiryMonth.value = '';
      state.insuranceExportFilter.expiryMonth = '';
      updateInsuranceExportPreview();
    });
  }

  if (elements.exportInsCompanySelect) {
    elements.exportInsCompanySelect.addEventListener('change', (e) => {
      state.insuranceExportFilter.insuranceCompany = e.target.value;
      updateInsuranceExportPreview();
    });
  }

  if (elements.btnExecuteInsuranceDownload) {
    elements.btnExecuteInsuranceDownload.addEventListener('click', executeInsuranceDownloadCsv);
  }

  if (elements.btnExecuteInsuranceDownloadPdf) {
    elements.btnExecuteInsuranceDownloadPdf.addEventListener('click', executeInsuranceDownloadPdf);
  }

  // Close modals on escape key or backdrop click
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModals();
  });

  if (elements.leadFormModal) {
    elements.leadFormModal.addEventListener('click', (e) => {
      if (e.target === elements.leadFormModal) closeModals();
    });
  }

  if (elements.viewDetailsModal) {
    elements.viewDetailsModal.addEventListener('click', (e) => {
      if (e.target === elements.viewDetailsModal) closeModals();
    });
  }

  if (elements.downloadModal) {
    elements.downloadModal.addEventListener('click', (e) => {
      if (e.target === elements.downloadModal) closeModals();
    });
  }

  if (elements.insuranceFormModal) {
    elements.insuranceFormModal.addEventListener('click', (e) => {
      if (e.target === elements.insuranceFormModal) closeModals();
    });
  }

  if (elements.viewInsuranceModal) {
    elements.viewInsuranceModal.addEventListener('click', (e) => {
      if (e.target === elements.viewInsuranceModal) closeModals();
    });
  }

  if (elements.insuranceDownloadModal) {
    elements.insuranceDownloadModal.addEventListener('click', (e) => {
      if (e.target === elements.insuranceDownloadModal) closeModals();
    });
  }
}

// ==============================================
// CRM MODULE SWITCHER LOGIC
// ==============================================

function switchCrm(crmType) {
  state.activeCrm = crmType;

  if (crmType === 'finance') {
    if (elements.btnSwitchFinance) elements.btnSwitchFinance.classList.add('active');
    if (elements.btnSwitchInsurance) elements.btnSwitchInsurance.classList.remove('active');
    if (elements.financeCrmView) elements.financeCrmView.classList.remove('hidden');
    if (elements.insuranceCrmView) elements.insuranceCrmView.classList.add('hidden');
    if (elements.financeHeaderActions) elements.financeHeaderActions.classList.remove('hidden');
    if (elements.insuranceHeaderActions) elements.insuranceHeaderActions.classList.add('hidden');
    if (elements.brandSubtitle) elements.brandSubtitle.textContent = 'Vehicle Loan & Finance CRM';
    fetchLeads();
    fetchStats();
  } else {
    if (elements.btnSwitchInsurance) elements.btnSwitchInsurance.classList.add('active');
    if (elements.btnSwitchFinance) elements.btnSwitchFinance.classList.remove('active');
    if (elements.insuranceCrmView) elements.insuranceCrmView.classList.remove('hidden');
    if (elements.financeCrmView) elements.financeCrmView.classList.add('hidden');
    if (elements.insuranceHeaderActions) elements.insuranceHeaderActions.classList.remove('hidden');
    if (elements.financeHeaderActions) elements.financeHeaderActions.classList.add('hidden');
    if (elements.brandSubtitle) elements.brandSubtitle.textContent = 'Vehicle Insurance & Renewal CRM';
    fetchInsurancePolicies();
    fetchInsuranceStats();
  }
}

// ==============================================
// INSURANCE CRM API & RENDERING FUNCTIONS
// ==============================================

function calculateDaysRemaining(toDateStr) {
  if (!toDateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(toDateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

async function fetchInsurancePolicies() {
  try {
    const params = new URLSearchParams();
    if (state.insuranceFilters.search) params.append('search', state.insuranceFilters.search);
    if (state.insuranceFilters.status && state.insuranceFilters.status !== 'All') {
      params.append('status', state.insuranceFilters.status);
    }
    if (state.insuranceFilters.insuranceCompany && state.insuranceFilters.insuranceCompany !== 'All') {
      params.append('insurance_company', state.insuranceFilters.insuranceCompany);
    }
    if (state.insuranceFilters.loanType && state.insuranceFilters.loanType !== 'All') {
      params.append('loan_type', state.insuranceFilters.loanType);
    }
    if (state.insuranceFilters.expiryMonth && state.insuranceFilters.expiryMonth !== 'All') {
      params.append('expiry_month', state.insuranceFilters.expiryMonth);
    }

    const res = await fetch(`/api/insurance?${params.toString()}`);
    const data = await res.json();
    if (data.success) {
      state.insurancePolicies = data.data;
      if (!state.insuranceFilters.search && state.insuranceFilters.status === 'All') {
        state.allInsurancePolicies = data.data;
      }
      renderInsuranceTable();
    }
  } catch (err) {
    console.error('Error fetching insurance policies:', err);
    showToast('Failed to load insurance policies', 'error');
  }
}

async function fetchInsuranceStats() {
  try {
    const res = await fetch('/api/insurance/stats');
    const data = await res.json();
    if (data.success) {
      state.insuranceStats = data.data;
      const s = data.data;

      if (elements.statTotalInsurance) elements.statTotalInsurance.textContent = s.totalPolicies || 0;
      if (elements.statExpiringSoonInsurance) elements.statExpiringSoonInsurance.textContent = s.expiringSoonCount || 0;
      if (elements.statExpiredInsurance) elements.statExpiredInsurance.textContent = s.expiredCount || 0;
      if (elements.statActiveInsurance) elements.statActiveInsurance.textContent = s.activeCount || 0;
      if (elements.statTotalPremium) elements.statTotalPremium.textContent = formatCurrency(s.totalPremium);
      if (elements.statTotalIdv) elements.statTotalIdv.textContent = formatCurrency(s.totalIdv);

      // Header Switcher Alert Badge (Alerts user even while viewing Loan CRM!)
      if (elements.insuranceNavBadge) {
        if (s.expiringSoonCount > 0) {
          elements.insuranceNavBadge.textContent = s.expiringSoonCount;
          elements.insuranceNavBadge.classList.remove('hidden');
        } else {
          elements.insuranceNavBadge.classList.add('hidden');
        }
      }

      // Expiry Alert Banner
      if (elements.insuranceExpiryAlertBanner && elements.bannerExpiringCount) {
        if (s.expiringSoonCount > 0) {
          elements.bannerExpiringCount.textContent = s.expiringSoonCount;
          elements.insuranceExpiryAlertBanner.classList.remove('hidden');
        } else {
          elements.insuranceExpiryAlertBanner.classList.add('hidden');
        }
      }

      // Status Tab Badge
      if (elements.tabExpiringCountBadge) {
        if (s.expiringSoonCount > 0) {
          elements.tabExpiringCountBadge.textContent = s.expiringSoonCount;
          elements.tabExpiringCountBadge.classList.remove('hidden');
        } else {
          elements.tabExpiringCountBadge.classList.add('hidden');
        }
      }

      updateInsuranceCompanyDropdown(s.byCompany || []);
    }
  } catch (err) {
    console.error('Error fetching insurance stats:', err);
  }
}

function updateInsuranceCompanyDropdown(companies) {
  if (!elements.filterInsuranceCompany) return;
  const currentVal = elements.filterInsuranceCompany.value;
  elements.filterInsuranceCompany.innerHTML = '<option value="All">All Insurance Companies</option>';

  companies.forEach(item => {
    if (item.company && item.company !== 'Other') {
      const opt = document.createElement('option');
      opt.value = item.company;
      opt.textContent = `${item.company} (${item.count})`;
      elements.filterInsuranceCompany.appendChild(opt);
    }
  });

  if (currentVal && [...elements.filterInsuranceCompany.options].some(o => o.value === currentVal)) {
    elements.filterInsuranceCompany.value = currentVal;
  }

  if (elements.exportInsCompanySelect) {
    const exportVal = elements.exportInsCompanySelect.value;
    elements.exportInsCompanySelect.innerHTML = '<option value="All">All Insurance Companies</option>';
    companies.forEach(item => {
      if (item.company && item.company !== 'Other') {
        const opt = document.createElement('option');
        opt.value = item.company;
        opt.textContent = `${item.company} (${item.count})`;
        elements.exportInsCompanySelect.appendChild(opt);
      }
    });
    if (exportVal && [...elements.exportInsCompanySelect.options].some(o => o.value === exportVal)) {
      elements.exportInsCompanySelect.value = exportVal;
    }
  }
}

function renderInsuranceTable() {
  const policies = state.insurancePolicies;
  if (!elements.insuranceTableBody) return;

  if (elements.insuranceCountBadge) {
    elements.insuranceCountBadge.textContent = `${policies.length} ${policies.length === 1 ? 'policy' : 'policies'}`;
  }
  if (elements.downloadInsuranceTableCount) {
    elements.downloadInsuranceTableCount.textContent = policies.length;
  }
  if (elements.insuranceLastUpdatedTime) {
    elements.insuranceLastUpdatedTime.textContent = 'Updated ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }

  if (policies.length === 0) {
    elements.insuranceTableBody.innerHTML = '';
    if (elements.insuranceEmptyState) elements.insuranceEmptyState.classList.remove('hidden');
    return;
  }

  if (elements.insuranceEmptyState) elements.insuranceEmptyState.classList.add('hidden');

  elements.insuranceTableBody.innerHTML = policies.map(p => {
    const daysLeft = p.days_left !== undefined ? p.days_left : calculateDaysRemaining(p.to_date);
    const isExpiringSoon = p.is_expiring_soon || (daysLeft !== null && daysLeft >= 0 && daysLeft <= 10);
    const isExpired = p.is_expired || (daysLeft !== null && daysLeft < 0);

    // Row Highlighting: RED for 0 to 10 days remaining or expired
    let rowClass = '';
    let alertBadgeHtml = '';

    if (isExpired) {
      rowClass = 'row-expired';
      alertBadgeHtml = `<span class="badge-expired">🔴 Expired (${Math.abs(daysLeft)}d ago)</span>`;
    } else if (daysLeft === 0) {
      rowClass = 'row-expiring-soon';
      alertBadgeHtml = `<span class="badge-expiring-soon" style="animation: pulseAlert 1.5s infinite; font-weight: 800;">🚨 EXPIRES TODAY!</span>`;
    } else if (isExpiringSoon) {
      rowClass = 'row-expiring-soon';
      alertBadgeHtml = `<span class="badge-expiring-soon">⚠️ ${daysLeft} Days Left</span>`;
    } else if (daysLeft !== null) {
      alertBadgeHtml = `<span class="badge-active-policy">Active (${daysLeft}d left)</span>`;
    } else {
      alertBadgeHtml = `<span class="text-muted">-</span>`;
    }

    // Direct WhatsApp Reminder pre-filled link
    const cleanPhone = (p.mobile_number || '').replace(/[^0-9]/g, '');
    let waUrl = '#';
    if (cleanPhone) {
      const waText = encodeURIComponent(
        `Dear ${p.customer_name},\nGreetings from SD Associates!\n\nThis is a friendly reminder that your vehicle insurance for *${p.model || 'Vehicle'}* (${p.vehicle_number || ''}) with *${p.insurance_company}* (Policy No: ${p.policy_number || 'N/A'}) is due for renewal on *${formatDate(p.to_date)}* (${daysLeft} days left).\n\nPlease contact us at SD Associates for best renewal quotes with maximum NCB discount and instant issuance.\n\nThank you!\n*SD Associates*`
      );
      waUrl = `https://wa.me/91${cleanPhone}?text=${waText}`;
    }

    return `
      <tr class="${rowClass}" data-id="${p.id}">
        <td style="text-align: center; font-weight: 700; color: #475569;">${p.serial_no}</td>
        <td>
          <div class="customer-cell">
            <span class="customer-name">${escapeHtml(p.customer_name)}</span>
            <div class="customer-meta" style="display: flex; align-items: center; gap: 0.35rem; margin-top: 2px;">
              <span class="customer-phone">${escapeHtml(p.mobile_number)}</span>
              ${cleanPhone ? `
                <a href="${waUrl}" target="_blank" title="Send WhatsApp Renewal Reminder" style="color: #16a34a; text-decoration: none; font-size: 13px;">💬</a>
                <a href="tel:${cleanPhone}" title="Call Customer" style="color: #0284c7; text-decoration: none; font-size: 12px;">📞</a>
              ` : ''}
            </div>
          </div>
        </td>
        <td>
          <span class="badge badge-loan-type">${escapeHtml(p.loan_type)}</span>
        </td>
        <td>
          <div class="vehicle-cell">
            <span class="vehicle-model">${escapeHtml(p.model || '-')} ${p.variant ? `<small class="text-muted">(${escapeHtml(p.variant)})</small>` : ''}</span>
            <span class="vehicle-plate">${escapeHtml(p.vehicle_number || 'New / Unregistered')}</span>
          </div>
        </td>
        <td style="text-align: right; font-weight: 600;">
          ${formatCurrency(p.idv_value)}
        </td>
        <td style="text-align: right; font-weight: 700; color: #2563eb;">
          ${formatCurrency(p.premium_amount)}
        </td>
        <td>
          <div style="font-size: 0.8rem;">
            <span class="text-muted">From:</span> ${formatDate(p.from_date)}<br>
            <span class="text-muted">To:</span> <strong style="${isExpiringSoon || isExpired ? 'color: #dc2626;' : ''}">${formatDate(p.to_date)}</strong>
          </div>
        </td>
        <td style="text-align: center;">
          ${alertBadgeHtml}
        </td>
        <td>
          <div>
            <strong>${escapeHtml(p.insurance_company)}</strong>
            ${p.policy_number ? `<br><small class="text-muted">${escapeHtml(p.policy_number)}</small>` : ''}
          </div>
        </td>
        <td class="text-right">
          <div class="action-buttons-cell">
            <button class="btn-action btn-view" title="View Full Policy Details" onclick="openViewInsuranceModal(${p.id})">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            <button class="btn-action btn-edit" title="Edit / Re-entry Policy" onclick="handleEditInsuranceClick(${p.id})">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button class="btn-action btn-delete" title="Delete Policy" onclick="handleDeleteInsuranceClick(${p.id})">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Live Expiry Preview in Form
function updateInsuranceFormExpiryPreview(toDateStr) {
  if (!elements.insuranceFormExpiryPreview) return;
  if (!toDateStr) {
    elements.insuranceFormExpiryPreview.classList.add('hidden');
    return;
  }

  const daysLeft = calculateDaysRemaining(toDateStr);
  elements.insuranceFormExpiryPreview.classList.remove('hidden', 'warning', 'expired', 'normal');

  if (daysLeft < 0) {
    elements.insuranceFormExpiryPreview.classList.add('expired');
    elements.insuranceFormExpiryPreview.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:50%; background:#fee2e2; color:#991b1b; flex-shrink:0;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
      </div>
      <div style="flex:1;">
        <div style="display:flex; align-items:center; gap:0.4rem; margin-bottom:0.15rem;">
          <span style="background:#991b1b; color:#fff; font-size:0.68rem; font-weight:800; padding:1px 6px; border-radius:999px; text-transform:uppercase;">Expired</span>
          <strong style="color:#7f1d1d; font-size:0.88rem;">Policy Expired ${Math.abs(daysLeft)} Days Ago</strong>
        </div>
        <span style="font-size:0.8rem; color:#991b1b;">Expiry date is in the past. Break-in inspection is required for policy renewal.</span>
      </div>
    `;
  } else if (daysLeft === 0) {
    elements.insuranceFormExpiryPreview.classList.add('warning');
    elements.insuranceFormExpiryPreview.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:50%; background:#fee2e2; color:#dc2626; flex-shrink:0; animation:softPulse 2s infinite;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
      </div>
      <div style="flex:1;">
        <div style="display:flex; align-items:center; gap:0.4rem; margin-bottom:0.15rem;">
          <span style="background:#dc2626; color:#fff; font-size:0.68rem; font-weight:800; padding:1px 6px; border-radius:999px; text-transform:uppercase;">Urgent</span>
          <strong style="color:#991b1b; font-size:0.88rem;">Policy Expires Today (Midnight)</strong>
        </div>
        <span style="font-size:0.8rem; color:#7f1d1d;">Coverage ends tonight. Follow up immediately to avoid policy lapse and loss of NCB.</span>
      </div>
    `;
  } else if (daysLeft <= 10) {
    elements.insuranceFormExpiryPreview.classList.add('warning');
    elements.insuranceFormExpiryPreview.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:50%; background:#fee2e2; color:#dc2626; flex-shrink:0; animation:softPulse 2s infinite;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
      </div>
      <div style="flex:1;">
        <div style="display:flex; align-items:center; gap:0.4rem; margin-bottom:0.15rem;">
          <span style="background:#dc2626; color:#fff; font-size:0.68rem; font-weight:800; padding:1px 6px; border-radius:999px; text-transform:uppercase;">Renewal Alert Zone</span>
          <strong style="color:#991b1b; font-size:0.88rem;">${daysLeft} Days Remaining</strong>
        </div>
        <span style="font-size:0.8rem; color:#7f1d1d;">Falls inside the 0–10 days renewal window! Table row will be highlighted in RED for proactive follow-up.</span>
      </div>
    `;
  } else {
    elements.insuranceFormExpiryPreview.classList.add('normal');
    elements.insuranceFormExpiryPreview.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:50%; background:#dcfce7; color:#15803d; flex-shrink:0;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <div style="flex:1;">
        <div style="display:flex; align-items:center; gap:0.4rem; margin-bottom:0.15rem;">
          <span style="background:#16a34a; color:#fff; font-size:0.68rem; font-weight:800; padding:1px 6px; border-radius:999px; text-transform:uppercase;">Active</span>
          <strong style="color:#166534; font-size:0.88rem;">Active Policy (${daysLeft} Days Remaining)</strong>
        </div>
        <span style="font-size:0.8rem; color:#166534;">Standard active period. Automatic renewal alerts will trigger 10 days before expiry date.</span>
      </div>
    `;
  }
}

// Open Insurance Form Modal
async function openNewInsuranceModal() {
  state.currentEditingInsuranceId = null;
  elements.insuranceForm.reset();
  elements.insuranceId.value = '';

  try {
    const res = await fetch('/api/insurance/next-serial');
    const data = await res.json();
    if (data.success && elements.insuranceSerialNo) {
      elements.insuranceSerialNo.value = data.nextSerial;
    }
  } catch (e) {
    // ignore
  }

  const today = new Date();
  const nextYear = new Date(today);
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  nextYear.setDate(nextYear.getDate() - 1);

  if (elements.insuranceFromDate) elements.insuranceFromDate.value = today.toISOString().slice(0, 10);
  if (elements.insuranceToDate) {
    elements.insuranceToDate.value = nextYear.toISOString().slice(0, 10);
    updateInsuranceFormExpiryPreview(elements.insuranceToDate.value);
  }

  if (elements.insuranceStatus) elements.insuranceStatus.value = 'Active';
  if (elements.insuranceLoanType) elements.insuranceLoanType.value = 'Comprehensive';

  if (elements.insuranceFormModalTitle) elements.insuranceFormModalTitle.textContent = 'New Insurance Policy Entry';
  if (elements.insuranceFormModalSubtitle) elements.insuranceFormModalSubtitle.textContent = 'Fill in customer, vehicle, IDV, and policy expiry details';
  if (elements.saveInsuranceBtnText) elements.saveInsuranceBtnText.textContent = 'Save Insurance Policy';
  if (elements.insuranceEditModeBanner) elements.insuranceEditModeBanner.classList.add('hidden');

  if (elements.insuranceCustomerName) elements.insuranceCustomerName.classList.remove('input-error');
  if (elements.insuranceMobileNumber) elements.insuranceMobileNumber.classList.remove('input-error');

  elements.insuranceFormModal.classList.remove('hidden');
  if (elements.insuranceCustomerName) elements.insuranceCustomerName.focus();
}

function openEditInsuranceModal(policy) {
  state.currentEditingInsuranceId = policy.id;
  elements.insuranceForm.reset();

  elements.insuranceId.value = policy.id;
  elements.insuranceSerialNo.value = policy.serial_no || '';
  elements.insuranceCustomerName.value = policy.customer_name || '';
  elements.insuranceMobileNumber.value = policy.mobile_number || '';
  elements.insuranceLoanType.value = policy.loan_type || 'Comprehensive';
  elements.insuranceVehicleNumber.value = policy.vehicle_number || '';
  elements.insuranceModel.value = policy.model || '';
  elements.insuranceVariant.value = policy.variant || '';
  elements.insuranceIdvValue.value = policy.idv_value || '';
  elements.insurancePremiumAmount.value = policy.premium_amount || '';
  elements.insuranceFromDate.value = policy.from_date || '';
  elements.insuranceToDate.value = policy.to_date || '';
  elements.insuranceCompany.value = policy.insurance_company || '';
  elements.insurancePolicyNumber.value = policy.policy_number || '';
  elements.insuranceReferenceBy.value = policy.reference_by || '';
  elements.insuranceStatus.value = policy.status || 'Active';
  elements.insuranceNotes.value = policy.notes || '';

  updateInsuranceFormExpiryPreview(policy.to_date);

  elements.insuranceFormModalTitle.textContent = 'Edit Insurance Policy (Re-entry)';
  elements.insuranceFormModalSubtitle.textContent = `Modifying policy for ${policy.customer_name} (Sl. No: ${policy.serial_no})`;
  elements.saveInsuranceBtnText.textContent = 'Update Insurance Policy';
  elements.insuranceEditModeBanner.classList.remove('hidden');

  elements.insuranceFormModal.classList.remove('hidden');
  elements.insuranceCustomerName.focus();
}

async function handleInsuranceFormSubmit(e) {
  e.preventDefault();

  const customerName = elements.insuranceCustomerName.value.trim();
  const mobileNumber = elements.insuranceMobileNumber.value.trim();
  const toDate = elements.insuranceToDate.value;
  const company = elements.insuranceCompany.value.trim();

  let hasError = false;
  if (!customerName) {
    elements.insuranceCustomerName.classList.add('input-error');
    if (document.getElementById('errInsuranceCustomerName')) document.getElementById('errInsuranceCustomerName').classList.remove('hidden');
    hasError = true;
  }
  if (!mobileNumber || mobileNumber.replace(/\D/g, '').length < 10) {
    elements.insuranceMobileNumber.classList.add('input-error');
    if (document.getElementById('errInsuranceMobileNumber')) document.getElementById('errInsuranceMobileNumber').classList.remove('hidden');
    hasError = true;
  }
  if (!toDate) {
    elements.insuranceToDate.classList.add('input-error');
    if (document.getElementById('errInsuranceToDate')) document.getElementById('errInsuranceToDate').classList.remove('hidden');
    hasError = true;
  }
  if (!company) {
    elements.insuranceCompany.classList.add('input-error');
    if (document.getElementById('errInsuranceCompany')) document.getElementById('errInsuranceCompany').classList.remove('hidden');
    hasError = true;
  }

  if (hasError) {
    showToast('Please fix the highlighted required fields', 'error');
    return;
  }

  const formData = {
    serial_no: elements.insuranceSerialNo.value.trim(),
    customer_name: customerName,
    mobile_number: mobileNumber,
    loan_type: elements.insuranceLoanType.value,
    vehicle_number: elements.insuranceVehicleNumber.value.trim(),
    model: elements.insuranceModel.value.trim(),
    variant: elements.insuranceVariant.value.trim(),
    idv_value: parseFloat(elements.insuranceIdvValue.value) || 0,
    premium_amount: parseFloat(elements.insurancePremiumAmount.value) || 0,
    from_date: elements.insuranceFromDate.value,
    to_date: toDate,
    insurance_company: company,
    policy_number: elements.insurancePolicyNumber.value.trim(),
    reference_by: elements.insuranceReferenceBy.value.trim(),
    status: elements.insuranceStatus.value,
    notes: elements.insuranceNotes.value.trim()
  };

  try {
    const isEditing = !!state.currentEditingInsuranceId;
    const url = isEditing ? `/api/insurance/${state.currentEditingInsuranceId}` : '/api/insurance';
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (data.success) {
      showToast(isEditing ? 'Insurance policy updated successfully!' : 'New insurance policy created successfully!', 'success');
      closeModals();
      await fetchInsurancePolicies();
      await fetchInsuranceStats();
    } else {
      showToast(data.error || 'Failed to save insurance policy', 'error');
    }
  } catch (err) {
    console.error('Error saving insurance policy:', err);
    showToast('Network error while saving insurance policy', 'error');
  }
}

// View Insurance Modal
async function openViewInsuranceModal(id) {
  let policy = state.insurancePolicies.find(p => p.id === id);
  if (!policy) {
    try {
      const res = await fetch(`/api/insurance/${id}`);
      const data = await res.json();
      if (data.success) policy = data.data;
    } catch (e) {
      // ignore
    }
  }

  if (!policy) {
    showToast('Policy details not found', 'error');
    return;
  }

  state.currentViewingInsurance = policy;

  const daysLeft = policy.days_left !== undefined ? policy.days_left : calculateDaysRemaining(policy.to_date);
  const isExpiringSoon = policy.is_expiring_soon || (daysLeft !== null && daysLeft >= 0 && daysLeft <= 10);
  const isExpired = policy.is_expired || (daysLeft !== null && daysLeft < 0);

  // Header Titles & Badges
  if (elements.viewInsuranceCustomerName) elements.viewInsuranceCustomerName.textContent = policy.customer_name || 'Customer Name';
  if (elements.viewInsuranceSerialNo) elements.viewInsuranceSerialNo.textContent = policy.serial_no || '-';
  if (elements.viewInsurancePolicyNo) elements.viewInsurancePolicyNo.textContent = policy.policy_number || 'N/A';
  if (elements.viewInsuranceTypeBadge) elements.viewInsuranceTypeBadge.textContent = policy.loan_type || 'Comprehensive';

  if (elements.viewInsuranceStatusBadge) {
    if (isExpired) {
      elements.viewInsuranceStatusBadge.textContent = 'Expired';
      elements.viewInsuranceStatusBadge.style.background = '#fee2e2';
      elements.viewInsuranceStatusBadge.style.color = '#991b1b';
      elements.viewInsuranceStatusBadge.style.border = '1px solid #fca5a5';
    } else if (daysLeft === 0) {
      elements.viewInsuranceStatusBadge.textContent = 'Expires Today';
      elements.viewInsuranceStatusBadge.style.background = '#fef2f2';
      elements.viewInsuranceStatusBadge.style.color = '#dc2626';
      elements.viewInsuranceStatusBadge.style.border = '1px solid #fca5a5';
    } else if (isExpiringSoon) {
      elements.viewInsuranceStatusBadge.textContent = `Expiring Soon (${daysLeft}d left)`;
      elements.viewInsuranceStatusBadge.style.background = '#fff1f2';
      elements.viewInsuranceStatusBadge.style.color = '#e11d48';
      elements.viewInsuranceStatusBadge.style.border = '1px solid #fecdd3';
    } else if (policy.status === 'Renewed') {
      elements.viewInsuranceStatusBadge.textContent = 'Renewed';
      elements.viewInsuranceStatusBadge.style.background = '#e0f2fe';
      elements.viewInsuranceStatusBadge.style.color = '#0284c7';
      elements.viewInsuranceStatusBadge.style.border = '1px solid #bae6fd';
    } else {
      elements.viewInsuranceStatusBadge.textContent = 'Active Policy';
      elements.viewInsuranceStatusBadge.style.background = '#dcfce7';
      elements.viewInsuranceStatusBadge.style.color = '#15803d';
      elements.viewInsuranceStatusBadge.style.border = '1px solid #bbf7d0';
    }
  }

  // 1. Customer Information
  if (elements.viewInsCustName) elements.viewInsCustName.textContent = policy.customer_name || '-';
  if (elements.viewInsMobile) elements.viewInsMobile.textContent = policy.mobile_number || '-';
  if (elements.viewInsReference) elements.viewInsReference.textContent = policy.reference_by || 'Direct Customer';

  // 2. Vehicle Details
  if (elements.viewInsVehNo) elements.viewInsVehNo.textContent = policy.vehicle_number || 'Unregistered';
  if (elements.viewInsModel) elements.viewInsModel.textContent = policy.model || '-';
  if (elements.viewInsVariant) elements.viewInsVariant.textContent = policy.variant || 'Standard';

  // 3. Valuation & Premium
  if (elements.viewInsIdv) elements.viewInsIdv.textContent = formatCurrency(policy.idv_value);
  if (elements.viewInsPremium) elements.viewInsPremium.textContent = formatCurrency(policy.premium_amount);
  if (elements.viewInsLoanType) elements.viewInsLoanType.textContent = policy.loan_type || '-';
  if (elements.viewInsStatus) {
    if (isExpired) {
      elements.viewInsStatus.innerHTML = '<span class="status-badge" style="background:#fee2e2; color:#991b1b; font-weight:700;">Expired</span>';
    } else if (isExpiringSoon) {
      elements.viewInsStatus.innerHTML = '<span class="status-badge" style="background:#fff1f2; color:#e11d48; font-weight:700;">Expiring Soon</span>';
    } else if (policy.status === 'Renewed') {
      elements.viewInsStatus.innerHTML = '<span class="status-badge" style="background:#e0f2fe; color:#0284c7; font-weight:700;">Renewed</span>';
    } else {
      elements.viewInsStatus.innerHTML = '<span class="status-badge" style="background:#dcfce7; color:#15803d; font-weight:700;">Active</span>';
    }
  }

  // 4. Coverage & Validity
  if (elements.viewInsCompany) elements.viewInsCompany.textContent = policy.insurance_company || '-';
  if (elements.viewInsPolicyNumber) elements.viewInsPolicyNumber.textContent = policy.policy_number || 'N/A';
  if (elements.viewInsFromDate) elements.viewInsFromDate.textContent = formatDate(policy.from_date);
  if (elements.viewInsToDate) elements.viewInsToDate.textContent = formatDate(policy.to_date);

  // Days Left alert tag
  if (elements.viewInsDaysLeft) {
    if (isExpired) {
      elements.viewInsDaysLeft.innerHTML = `<span style="display:inline-block; padding: 0.2rem 0.6rem; border-radius: 4px; background:#fee2e2; color:#991b1b; font-weight:700;">Expired (${Math.abs(daysLeft)} days ago)</span>`;
    } else if (daysLeft === 0) {
      elements.viewInsDaysLeft.innerHTML = `<span style="display:inline-block; padding: 0.2rem 0.6rem; border-radius: 4px; background:#fef2f2; color:#dc2626; font-weight:800; border:1px solid #fca5a5;">⚠️ Expires TODAY!</span>`;
    } else if (isExpiringSoon) {
      elements.viewInsDaysLeft.innerHTML = `<span style="display:inline-block; padding: 0.2rem 0.6rem; border-radius: 4px; background:#fff1f2; color:#e11d48; font-weight:800; border:1px solid #fecdd3;">⚠️ ${daysLeft} days left (Renewal Alert Zone)</span>`;
    } else {
      elements.viewInsDaysLeft.innerHTML = `<span style="display:inline-block; padding: 0.2rem 0.6rem; border-radius: 4px; background:#f0fdf4; color:#15803d; font-weight:700;">${daysLeft} days remaining</span>`;
    }
  }

  // 5. Notes
  if (elements.viewInsNotes) {
    elements.viewInsNotes.textContent = policy.notes && policy.notes.trim() ? policy.notes : 'No renewal notes recorded.';
  }

  // View Modal Alert Banner with Modern Executive Design
  if (elements.viewInsuranceAlertBanner) {
    elements.viewInsuranceAlertBanner.className = 'insurance-hero-alert';
    if (isExpired) {
      elements.viewInsuranceAlertBanner.classList.add('alert-expired');
      elements.viewInsuranceAlertBanner.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; background: #fee2e2; border: 2px solid #b91c1c; color: #991b1b; flex-shrink: 0;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem; flex-wrap: wrap;">
            <span style="background: #991b1b; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 9999px; letter-spacing: 0.5px; text-transform: uppercase;">Expired Policy</span>
            <span style="font-weight: 800; font-size: 0.95rem; color: #7f1d1d;">Expired ${Math.abs(daysLeft)} Days Ago (${formatDate(policy.to_date)})</span>
          </div>
          <p style="margin: 0; font-size: 0.85rem; color: #7f1d1d; line-height: 1.4;">
            Coverage has ended. Vehicle inspection / break-in inspection is required for renewal. Reach out to the customer immediately.
          </p>
        </div>
        <div style="text-align: right; flex-shrink: 0;">
          <div style="font-size: 1.35rem; font-weight: 900; color: #991b1b; line-height: 1;">LAPSED</div>
          <span style="font-size: 0.7rem; font-weight: 700; color: #991b1b; text-transform: uppercase;">Break-in Req.</span>
        </div>
      `;
    } else if (daysLeft === 0) {
      elements.viewInsuranceAlertBanner.classList.add('alert-urgent');
      elements.viewInsuranceAlertBanner.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; background: #fee2e2; border: 2px solid #ef4444; color: #dc2626; flex-shrink: 0; animation: softPulse 2s infinite;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem; flex-wrap: wrap;">
            <span style="background: #dc2626; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 9999px; letter-spacing: 0.5px; text-transform: uppercase;">Urgent: Expires Today</span>
            <span style="font-weight: 800; font-size: 0.95rem; color: #991b1b;">Final Day of Coverage (${formatDate(policy.to_date)})</span>
          </div>
          <p style="margin: 0; font-size: 0.85rem; color: #7f1d1d; line-height: 1.4;">
            Send payment link or renewal confirmation before midnight to avoid policy lapse and loss of No-Claim Bonus (NCB).
          </p>
        </div>
        <div style="text-align: right; flex-shrink: 0;">
          <div style="font-size: 1.5rem; font-weight: 900; color: #dc2626; line-height: 1;">TODAY</div>
          <span style="font-size: 0.7rem; font-weight: 700; color: #b91c1c; text-transform: uppercase;">Expires Midnight</span>
        </div>
      `;
    } else if (isExpiringSoon) {
      elements.viewInsuranceAlertBanner.classList.add('alert-urgent');
      elements.viewInsuranceAlertBanner.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; background: #fee2e2; border: 2px solid #ef4444; color: #dc2626; flex-shrink: 0; animation: softPulse 2s infinite;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem; flex-wrap: wrap;">
            <span style="background: #dc2626; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 9999px; letter-spacing: 0.5px; text-transform: uppercase;">Action Required</span>
            <span style="font-weight: 800; font-size: 0.95rem; color: #991b1b;">${daysLeft} Days Left for Renewal</span>
          </div>
          <p style="margin: 0; font-size: 0.85rem; color: #7f1d1d; line-height: 1.4;">
            Insurance expires on <strong>${formatDate(policy.to_date)}</strong>. Follow up with customer now for instant renewal.
          </p>
        </div>
        <div style="text-align: right; flex-shrink: 0;">
          <div style="font-size: 1.6rem; font-weight: 900; color: #dc2626; line-height: 1;">${daysLeft}d</div>
          <span style="font-size: 0.7rem; font-weight: 700; color: #b91c1c; text-transform: uppercase;">Remaining</span>
        </div>
      `;
    } else if (policy.status === 'Renewed') {
      elements.viewInsuranceAlertBanner.classList.add('alert-active');
      elements.viewInsuranceAlertBanner.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; background: #e0f2fe; border: 2px solid #0284c7; color: #0284c7; flex-shrink: 0;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
            <span style="background: #0284c7; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 9999px; letter-spacing: 0.5px; text-transform: uppercase;">Policy Renewed</span>
            <span style="font-weight: 800; font-size: 0.95rem; color: #0369a1;">Successfully Renewed</span>
          </div>
          <p style="margin: 0; font-size: 0.85rem; color: #075985; line-height: 1.4;">
            This policy has been successfully renewed. Valid coverage period is documented in files.
          </p>
        </div>
      `;
    } else {
      elements.viewInsuranceAlertBanner.classList.add('alert-active');
      elements.viewInsuranceAlertBanner.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; background: #dcfce7; border: 2px solid #16a34a; color: #15803d; flex-shrink: 0;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
            <span style="background: #16a34a; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 9999px; letter-spacing: 0.5px; text-transform: uppercase;">Active Policy</span>
            <span style="font-weight: 800; font-size: 0.95rem; color: #166534;">Valid until ${formatDate(policy.to_date)}</span>
          </div>
          <p style="margin: 0; font-size: 0.85rem; color: #166534; line-height: 1.4;">
            Policy is active with <strong>${daysLeft} days</strong> remaining. Renewal alert triggers 10 days before expiry date.
          </p>
        </div>
        <div style="text-align: right; flex-shrink: 0;">
          <div style="font-size: 1.6rem; font-weight: 900; color: #15803d; line-height: 1;">${daysLeft}d</div>
          <span style="font-size: 0.7rem; font-weight: 700; color: #166534; text-transform: uppercase;">Remaining</span>
        </div>
      `;
    }
  }

  // WhatsApp & Phone Action Buttons
  const cleanPhone = (policy.mobile_number || '').replace(/[^0-9]/g, '');
  if (elements.btnInsWhatsApp) {
    if (cleanPhone) {
      const waText = encodeURIComponent(
        `Dear ${policy.customer_name},\nGreetings from SD Associates!\n\nThis is a friendly reminder that your vehicle insurance for *${policy.model || 'Vehicle'}* (${policy.vehicle_number || ''}) with *${policy.insurance_company}* (Policy No: ${policy.policy_number || 'N/A'}) is due for renewal on *${formatDate(policy.to_date)}* (${daysLeft} days left).\n\nPlease contact us at SD Associates for best renewal quotes with maximum NCB discount and instant issuance.\n\nThank you!\n*SD Associates*`
      );
      elements.btnInsWhatsApp.href = `https://wa.me/91${cleanPhone}?text=${waText}`;
      elements.btnInsWhatsApp.style.display = 'inline-flex';
    } else {
      elements.btnInsWhatsApp.style.display = 'none';
    }
  }

  if (elements.btnInsCall) {
    if (cleanPhone) {
      elements.btnInsCall.href = `tel:${cleanPhone}`;
      elements.btnInsCall.style.display = 'inline-flex';
    } else {
      elements.btnInsCall.style.display = 'none';
    }
  }

  elements.viewInsuranceModal.classList.remove('hidden');
}

// Global click helpers for row buttons
window.openViewInsuranceModal = openViewInsuranceModal;
window.handleEditInsuranceClick = function(id) {
  const policy = state.insurancePolicies.find(p => p.id === id);
  if (policy) openEditInsuranceModal(policy);
};
window.handleDeleteInsuranceClick = async function(id) {
  if (!confirm('Are you sure you want to delete this insurance policy?')) return;
  try {
    const res = await fetch(`/api/insurance/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      showToast('Insurance policy deleted successfully', 'success');
      await fetchInsurancePolicies();
      await fetchInsuranceStats();
    } else {
      showToast(data.error || 'Failed to delete policy', 'error');
    }
  } catch (err) {
    showToast('Network error while deleting policy', 'error');
  }
};

// Insurance Export & Download
async function openInsuranceDownloadModal() {
  try {
    const res = await fetch('/api/insurance');
    const data = await res.json();
    if (data.success) state.allInsurancePolicies = data.data;
  } catch (e) {
    // ignore
  }

  state.insuranceExportFilter.status = (state.insuranceFilters.status && state.insuranceFilters.status !== 'All') ? state.insuranceFilters.status : 'All';
  state.insuranceExportFilter.loanType = (state.insuranceFilters.loanType && state.insuranceFilters.loanType !== 'All') ? state.insuranceFilters.loanType : 'All';
  state.insuranceExportFilter.insuranceCompany = (state.insuranceFilters.insuranceCompany && state.insuranceFilters.insuranceCompany !== 'All') ? state.insuranceFilters.insuranceCompany : 'All';
  state.insuranceExportFilter.expiryMonth = state.insuranceFilters.expiryMonth || '';

  if (elements.exportInsStatusOptions) {
    elements.exportInsStatusOptions.querySelectorAll('.pill-option').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-val') === state.insuranceExportFilter.status);
    });
  }

  if (elements.exportInsTypeOptions) {
    elements.exportInsTypeOptions.querySelectorAll('.pill-option').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-val') === state.insuranceExportFilter.loanType);
    });
  }

  if (elements.exportInsExpiryMonth) {
    elements.exportInsExpiryMonth.value = state.insuranceExportFilter.expiryMonth;
  }

  if (elements.exportInsCompanySelect) {
    elements.exportInsCompanySelect.value = state.insuranceExportFilter.insuranceCompany;
  }

  updateInsuranceExportPreview();
  if (elements.insuranceDownloadModal) elements.insuranceDownloadModal.classList.remove('hidden');
}

function updateInsuranceExportPreview() {
  let filtered = [...state.allInsurancePolicies];

  if (state.insuranceExportFilter.status && state.insuranceExportFilter.status !== 'All') {
    if (state.insuranceExportFilter.status === 'Expiring Soon') {
      filtered = filtered.filter(p => p.is_expiring_soon);
    } else if (state.insuranceExportFilter.status === 'Expired') {
      filtered = filtered.filter(p => p.is_expired);
    } else if (state.insuranceExportFilter.status === 'Active') {
      filtered = filtered.filter(p => !p.is_expired && !p.is_expiring_soon && p.status !== 'Renewed');
    } else {
      filtered = filtered.filter(p => p.status === state.insuranceExportFilter.status);
    }
  }

  if (state.insuranceExportFilter.loanType && state.insuranceExportFilter.loanType !== 'All') {
    filtered = filtered.filter(p => p.loan_type === state.insuranceExportFilter.loanType);
  }

  if (state.insuranceExportFilter.insuranceCompany && state.insuranceExportFilter.insuranceCompany !== 'All') {
    filtered = filtered.filter(p => p.insurance_company === state.insuranceExportFilter.insuranceCompany);
  }

  if (state.insuranceExportFilter.expiryMonth) {
    filtered = filtered.filter(p => p.to_date && p.to_date.startsWith(state.insuranceExportFilter.expiryMonth));
  }

  const totalPremium = filtered.reduce((sum, p) => sum + (Number(p.premium_amount) || 0), 0);

  if (elements.exportInsMatchCount) elements.exportInsMatchCount.textContent = filtered.length;
  if (elements.exportInsMatchPremium) elements.exportInsMatchPremium.textContent = formatCurrency(totalPremium);

  const parts = ['SD_Associates_Insurance'];
  if (state.insuranceExportFilter.status !== 'All') parts.push(state.insuranceExportFilter.status.replace(/\s+/g, '_'));
  if (state.insuranceExportFilter.expiryMonth) parts.push(state.insuranceExportFilter.expiryMonth);
  parts.push(new Date().toISOString().slice(0, 10));
  if (elements.exportInsPreviewFilename) {
    elements.exportInsPreviewFilename.textContent = `${parts.join('_')}.csv`;
  }
}

function buildInsuranceFilterParams() {
  const params = new URLSearchParams();
  if (state.insuranceExportFilter.status && state.insuranceExportFilter.status !== 'All') {
    params.append('status', state.insuranceExportFilter.status);
  }
  if (state.insuranceExportFilter.loanType && state.insuranceExportFilter.loanType !== 'All') {
    params.append('loan_type', state.insuranceExportFilter.loanType);
  }
  if (state.insuranceExportFilter.insuranceCompany && state.insuranceExportFilter.insuranceCompany !== 'All') {
    params.append('insurance_company', state.insuranceExportFilter.insuranceCompany);
  }
  if (state.insuranceExportFilter.expiryMonth) {
    params.append('expiry_month', state.insuranceExportFilter.expiryMonth);
  }
  return params;
}

function executeInsuranceDownloadCsv() {
  const params = buildInsuranceFilterParams();
  window.location.href = `/api/insurance/export?${params.toString()}`;
  showToast('Downloading insurance policies CSV...', 'success');
  closeModals();
}

function executeInsuranceDownloadPdf() {
  const params = buildInsuranceFilterParams();
  params.append('autoprint', '1');
  window.open(`/report/insurance?${params.toString()}`, '_blank');
  showToast('Opening insurance printable PDF table...', 'success');
  closeModals();
}

// Initialize Application
async function init() {
  setupEventListeners();
  await fetchLeads();
  await fetchStats();
  // Silently pre-fetch insurance stats so header warning badge lights up immediately if renewals are due!
  await fetchInsuranceStats();
}

document.addEventListener('DOMContentLoaded', init);

