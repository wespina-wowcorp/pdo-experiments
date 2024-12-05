// JS condition for Optimizely Audience - Baby Segment (SIT Test accounts)

const ACCOUNT_01 = {
  email: "pdo-test-account-01@woolworths.co.nz",
  medalliaData_ae7b583f935b4b8074db1c3cac5de16b702c5fca6850dfa8a11b3c23b66c044f:
    { medallia_scvId: "9bdbbddf-99f5-4d0c-9d5b-2603703dc7c8" },
};

const ACCOUNT_02 = {
  email: "pdo-test-account-02@woolworths.co.nz",
  medalliaData_f726e6016e970b9fea4a9b9582b408e10332ff468c909f9ddf1fe667e7592d84:
    { medallia_scvId: "97ee3072-c9ba-49df-9f5d-5bab704be30c" },
};

const ACCOUNT_03 = {
  email: "pdo-test-account-03@woolworths.co.nz",
  medalliaData_155e458f96ec81533e2f3990333aaba0eaace19b2e6e7ad44706b0fb23f243bc:
    { medallia_scvId: "38a98a41-31af-484a-8fdd-d3db31c65f1e" },
};

const ACCOUNT_04 = {
  email: "pdo-test-account-04@woolworths.co.nz",
  medalliaData_841e77dfd47c4c5736046edda8c90abdf1af10301f9f618d284009f5194203fa:
    { medallia_scvId: "1a4ebeea-3436-478d-acc6-e0bbdf9dff4d" },
};

const ACCOUNT_05 = {
  email: "pdo-test-account-05@woolworths.co.nz",
  medalliaData_51cb7c5fc0d00866d8a7600831467a2116e57aab292d127e8cd2c7fea848e4e4:
    { medallia_scvId: "c085f943-f677-445a-b9ed-70193194808a" },
};

const ACCOUNT_06 = {
  email: "pdo-test-account-06@woolworths.co.nz",
  medalliaData_dccc50d86dc8f8134893d8740208c6ac01ef89ba46b8aa829ef93df68b05a862:
    { medallia_scvId: "399de6ed-59cf-4e84-b9d6-0085517791ef" },
};

const ACCOUNT_07 = {
  email: "pdo-test-account-07@woolworths.co.nz",
  medalliaData_66033082a853b76319c94072284b23aec9604f88ef75ab21c1fd9ab85a382cd2:
    { medallia_scvId: "909f2cba-1e09-4153-9ff6-f6314d383c6b" },
};

const ACCOUNT_08 = {
  email: "pdo-test-account-08@woolworths.co.nz",
  medalliaData_82e7f715665e1a9d52594c7bdbfebd2676c177289b3f6d9f6a39604506ef9fa2:
    { medallia_scvId: "53886d7b-84e0-44b6-9625-c84f8eaa4f7a" },
};

const ACCOUNT_09 = {
  email: "pdo-test-account-09@woolworths.co.nz",
  medalliaData_2a9cd55a35e5b18ae6c6f3368ce046b37a7c0e42eda81ad2413cf6407e621dd7:
    { medallia_scvId: "28f2f20e-a091-4f50-869c-fbf9957c11cb" },
};

const ACCOUNT_10 = {
  email: "pdo-test-account-10@woolworths.co.nz",
  medalliaData_cab065a8be48cb5b730ebaad5a39985e129349a14f08f286dccfee5e84eb6853:
    { medallia_scvId: "67fececa-a499-4f1f-85bf-eaff98b89e57" },
};

const accounts = [
  ACCOUNT_01,
  ACCOUNT_02,
  ACCOUNT_03,
  ACCOUNT_04,
  ACCOUNT_05,
  ACCOUNT_06,
  ACCOUNT_07,
  ACCOUNT_08,
  ACCOUNT_09,
  ACCOUNT_10,
];

accounts.some((account) => {
  const localStorageKey = Object.keys(account)[1];
  const scvid = localStorage.getItem(localStorageKey);

  return scvid !== null;
});

// JS condition for Optimizely Audience - Pet Segment (SIT Test accounts)
