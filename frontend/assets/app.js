const WEEKDAYS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

const instrumentSeedData = [
  {
    id: "HPLC-01",
    name: "超高效液相色谱",
    code: "HPLC-01",
    category: "chemistry",
    room: "B2-305",
    status: "available",
    manager: "王敏",
    description: "用于小分子药物和代谢产物定量分析，支持多梯度洗脱。",
    lastService: "2024-04-10",
    nextMaintenance: "2024-05-20",
    tags: ["化学分析", "药物开发"],
  },
  {
    id: "PCR-02",
    name: "实时荧光定量 PCR",
    code: "PCR-02",
    category: "biology",
    room: "B1-210",
    status: "available",
    manager: "陈虹",
    description: "用于核酸扩增与定量检测，配备 96 孔模块。",
    lastService: "2024-03-28",
    nextMaintenance: "2024-06-01",
    tags: ["生物检测", "核酸定量"],
  },
  {
    id: "CELL-03",
    name: "活细胞成像系统",
    code: "CELL-03",
    category: "imaging",
    room: "A3-118",
    status: "maintenance",
    manager: "刘洋",
    description: "实时监控细胞形态与迁移，支持多通道荧光。",
    lastService: "2024-05-08",
    nextMaintenance: "2024-05-15",
    tags: ["显微成像", "细胞动力学"],
  },
  {
    id: "GCMS-04",
    name: "气质联用仪",
    code: "GCMS-04",
    category: "chemistry",
    room: "B2-110",
    status: "available",
    manager: "张琪",
    description: "适用于挥发性有机物分析，带自动进样器。",
    lastService: "2024-04-22",
    nextMaintenance: "2024-06-05",
    tags: ["化学分析", "环境检测"],
  },
  {
    id: "FACS-05",
    name: "流式细胞仪",
    code: "FACS-05",
    category: "biology",
    room: "B1-115",
    status: "available",
    manager: "吴迪",
    description: "四激光八色配置，支持细胞分选。",
    lastService: "2024-04-18",
    nextMaintenance: "2024-05-30",
    tags: ["生物检测", "细胞分析"],
  },
  {
    id: "NMR-06",
    name: "核磁共振波谱仪",
    code: "NMR-06",
    category: "chemistry",
    room: "C1-201",
    status: "maintenance",
    manager: "何颖",
    description: "400 MHz 高频谱仪，支持固体与液体样品。",
    lastService: "2024-04-02",
    nextMaintenance: "2024-05-18",
    tags: ["化学分析", "结构鉴定"],
  },
];

let instrumentState = instrumentSeedData.map((item) => ({ ...item }));

const dashboardData = {
  metrics: {
    "active-users": { value: "48", delta: "较上周 +12%" },
    utilization: { value: "68%", delta: "周环比 +5%" },
    "no-show": { value: "3", delta: "本月 3 起" },
    favorites: { value: "6", delta: "常用仪器数量" },
  },
  reservations: [
    {
      instrumentId: "HPLC-01",
      instrumentName: "超高效液相色谱",
      user: "张伟",
      date: "2024-05-13",
      start: "09:00",
      end: "11:00",
      status: "待签到",
    },
    {
      instrumentId: "PCR-02",
      instrumentName: "实时荧光定量 PCR",
      user: "王芳",
      date: "2024-05-13",
      start: "13:30",
      end: "15:00",
      status: "已签到",
    },
    {
      instrumentId: "FACS-05",
      instrumentName: "流式细胞仪",
      user: "刘俊",
      date: "2024-05-13",
      start: "15:30",
      end: "17:00",
      status: "待审批",
    },
    {
      instrumentId: "GCMS-04",
      instrumentName: "气质联用仪",
      user: "赵琳",
      date: "2024-05-14",
      start: "10:00",
      end: "12:00",
      status: "已确认",
    },
  ],
  availability: [
    {
      instrumentId: "PCR-02",
      name: "实时荧光定量 PCR",
      location: "B1-210",
      window: "13:00 – 17:00",
      status: "available",
      queue: 2,
    },
    {
      instrumentId: "GCMS-04",
      name: "气质联用仪",
      location: "B2-110",
      window: "09:00 – 11:00",
      status: "busy",
      queue: 1,
    },
    {
      instrumentId: "CELL-03",
      name: "活细胞成像系统",
      location: "A3-118",
      window: "全天维护",
      status: "maintenance",
      queue: 0,
    },
    {
      instrumentId: "FACS-05",
      name: "流式细胞仪",
      location: "B1-115",
      window: "08:30 – 10:30",
      status: "available",
      queue: 0,
    },
  ],
  waitlist: [
    {
      instrumentName: "流式细胞仪",
      user: "赵敏",
      window: "15:30 时段",
      notifyBefore: "提前 20 分钟短信提醒",
    },
    {
      instrumentName: "超高效液相色谱",
      user: "孙昊",
      window: "明日 09:00 时段",
      notifyBefore: "加入等待队列，剩余 1 人",
    },
  ],
  maintenance: [
    {
      instrumentName: "活细胞成像系统",
      date: "2024-05-15",
      action: "激光器校准",
      contact: "刘洋",
    },
    {
      instrumentName: "核磁共振波谱仪",
      date: "2024-05-18",
      action: "磁体低温补液",
      contact: "何颖",
    },
  ],
};

const scheduleDays = [
  "2024-05-13",
  "2024-05-14",
  "2024-05-15",
  "2024-05-16",
  "2024-05-17",
];

const scheduleData = {
  "HPLC-01": {
    manager: "王敏",
    name: "超高效液相色谱",
    category: "chemistry",
    schedule: {
      "2024-05-13": [
        {
          start: "08:00",
          end: "09:00",
          state: "available",
          note: "适合快速清洗程序",
        },
        {
          start: "09:00",
          end: "11:00",
          state: "reserved",
          owner: "张伟",
          purpose: "药物纯度检测",
          status: "待签到",
        },
        {
          start: "11:15",
          end: "12:00",
          state: "available",
          note: "空闲 45 分钟",
        },
        {
          start: "13:00",
          end: "15:00",
          state: "reserved",
          owner: "李静",
          purpose: "代谢组样品",
          status: "进行中",
        },
        {
          start: "15:15",
          end: "16:30",
          state: "maintenance",
          purpose: "系统冲洗",
        },
      ],
      "2024-05-14": [
        {
          start: "08:30",
          end: "10:30",
          state: "reserved",
          owner: "吴鹏",
          purpose: "稳定性考察",
          status: "已确认",
        },
        {
          start: "10:45",
          end: "12:00",
          state: "available",
          note: "可预约 75 分钟",
        },
        {
          start: "13:00",
          end: "16:00",
          state: "reserved",
          owner: "周敏",
          purpose: "杂质分析",
          status: "已确认",
        },
      ],
      "2024-05-15": [
        {
          start: "09:00",
          end: "12:00",
          state: "reserved",
          owner: "张伟",
          purpose: "重复实验",
          status: "待审批",
        },
        {
          start: "13:00",
          end: "16:00",
          state: "available",
          note: "下午空闲",
        },
      ],
      "2024-05-16": [
        {
          start: "08:00",
          end: "09:30",
          state: "available",
          note: "早间空档",
        },
        {
          start: "09:30",
          end: "12:30",
          state: "reserved",
          owner: "宋倩",
          purpose: "杂环化合物",
          status: "已确认",
        },
      ],
      "2024-05-17": [
        {
          start: "08:00",
          end: "12:00",
          state: "maintenance",
          purpose: "更换滤芯",
        },
        {
          start: "13:00",
          end: "16:00",
          state: "available",
          note: "维护后测试",
        },
      ],
    },
  },
  "PCR-02": {
    manager: "陈虹",
    name: "实时荧光定量 PCR",
    category: "biology",
    schedule: {
      "2024-05-13": [
        {
          start: "08:30",
          end: "10:00",
          state: "reserved",
          owner: "李娜",
          purpose: "转录水平检测",
          status: "进行中",
        },
        {
          start: "10:00",
          end: "12:00",
          state: "available",
          note: "开放自助预约",
        },
        {
          start: "13:30",
          end: "15:00",
          state: "reserved",
          owner: "王芳",
          purpose: "病毒载量测定",
          status: "已签到",
        },
        {
          start: "15:15",
          end: "17:00",
          state: "available",
          note: "适合培训实验",
        },
      ],
      "2024-05-14": [
        {
          start: "08:00",
          end: "09:30",
          state: "available",
          note: "早间空闲",
        },
        {
          start: "09:30",
          end: "11:30",
          state: "reserved",
          owner: "赵磊",
          purpose: "疫苗评价",
          status: "已确认",
        },
        {
          start: "13:00",
          end: "16:00",
          state: "reserved",
          owner: "贺颖",
          purpose: "基因表达分析",
          status: "待签到",
        },
      ],
      "2024-05-15": [
        {
          start: "08:00",
          end: "12:00",
          state: "reserved",
          owner: "李娜",
          purpose: "批量实验",
          status: "已确认",
        },
        {
          start: "13:00",
          end: "15:30",
          state: "available",
          note: "下午空档",
        },
      ],
      "2024-05-16": [
        {
          start: "09:00",
          end: "11:00",
          state: "reserved",
          owner: "陈浩",
          purpose: "样本复核",
          status: "待审批",
        },
        {
          start: "11:15",
          end: "17:00",
          state: "available",
          note: "下午全部空闲",
        },
      ],
      "2024-05-17": [
        {
          start: "08:00",
          end: "12:00",
          state: "maintenance",
          purpose: "温控系统巡检",
        },
        {
          start: "13:00",
          end: "16:00",
          state: "available",
          note: "维护完成后开放",
        },
      ],
    },
  },
  "FACS-05": {
    manager: "吴迪",
    name: "流式细胞仪",
    category: "biology",
    schedule: {
      "2024-05-13": [
        {
          start: "08:30",
          end: "10:00",
          state: "reserved",
          owner: "李倩",
          purpose: "免疫表型分析",
          status: "进行中",
        },
        {
          start: "10:15",
          end: "12:00",
          state: "available",
          note: "开放预约",
        },
        {
          start: "13:00",
          end: "15:00",
          state: "reserved",
          owner: "刘俊",
          purpose: "药效评估",
          status: "待审批",
        },
        {
          start: "15:15",
          end: "17:00",
          state: "available",
          note: "可延长使用",
        },
      ],
      "2024-05-14": [
        {
          start: "08:30",
          end: "12:00",
          state: "reserved",
          owner: "周凯",
          purpose: "细胞周期分析",
          status: "已确认",
        },
        {
          start: "13:00",
          end: "16:00",
          state: "available",
          note: "下午空档",
        },
      ],
      "2024-05-15": [
        {
          start: "09:00",
          end: "11:30",
          state: "available",
          note: "可预约",
        },
        {
          start: "13:00",
          end: "15:30",
          state: "reserved",
          owner: "郭婷",
          purpose: "临床样本检测",
          status: "进行中",
        },
      ],
      "2024-05-16": [
        {
          start: "08:30",
          end: "10:30",
          state: "reserved",
          owner: "陈晨",
          purpose: "细胞凋亡",
          status: "已确认",
        },
        {
          start: "10:45",
          end: "17:00",
          state: "available",
          note: "剩余时段可续约",
        },
      ],
      "2024-05-17": [
        {
          start: "09:00",
          end: "11:00",
          state: "available",
          note: "周五空档",
        },
        {
          start: "11:15",
          end: "15:00",
          state: "reserved",
          owner: "赵敏",
          purpose: "功能性实验",
          status: "已确认",
        },
      ],
    },
  },
};

const analyticsData = {
  metrics: {
    "monthly-slots": { value: "168", delta: "较上月 +12%" },
    "peak-days": { value: "周二", delta: "10:00 – 14:00 最繁忙" },
    "avg-duration": { value: "2.4 小时", delta: "规则上限 4 小时" },
    "violation-rate": { value: "3.8%", delta: "同比 -1.2%" },
  },
  utilization: {
    chemistry: [
      { label: "第 9 周", size: "md", value: "58%" },
      { label: "第 10 周", size: "lg", value: "71%" },
      { label: "第 11 周", size: "md", value: "64%" },
      { label: "第 12 周", size: "lg", value: "76%" },
    ],
    biology: [
      { label: "第 9 周", size: "sm", value: "42%" },
      { label: "第 10 周", size: "md", value: "55%" },
      { label: "第 11 周", size: "md", value: "57%" },
      { label: "第 12 周", size: "lg", value: "68%" },
    ],
    imaging: [
      { label: "第 9 周", size: "sm", value: "35%" },
      { label: "第 10 周", size: "md", value: "48%" },
      { label: "第 11 周", size: "sm", value: "41%" },
      { label: "第 12 周", size: "md", value: "52%" },
    ],
  },
  topUsage: [
    {
      rank: 1,
      instrumentId: "HPLC-01",
      instrumentName: "超高效液相色谱",
      duration: "42 小时",
      count: 18,
      utilization: "83%",
    },
    {
      rank: 2,
      instrumentId: "FACS-05",
      instrumentName: "流式细胞仪",
      duration: "36 小时",
      count: 15,
      utilization: "79%",
    },
    {
      rank: 3,
      instrumentId: "PCR-02",
      instrumentName: "实时荧光定量 PCR",
      duration: "28 小时",
      count: 14,
      utilization: "73%",
    },
    {
      rank: 4,
      instrumentId: "GCMS-04",
      instrumentName: "气质联用仪",
      duration: "22 小时",
      count: 9,
      utilization: "61%",
    },
  ],
  violations: [
    {
      date: "2024-05-08",
      user: "赵磊",
      instrumentName: "实时荧光定量 PCR",
      type: "未签到",
      action: "发送提醒，扣除信用 2 分",
    },
    {
      date: "2024-05-05",
      user: "郭婷",
      instrumentName: "流式细胞仪",
      type: "超时 18 分钟",
      action: "系统自动延长并通知下一位",
    },
  ],
  dataHealth: [
    { name: "数据库备份", status: "已完成 (2024-05-12 02:00)", level: "success" },
    { name: "日志归档", status: "预计 2024-05-13 23:00", level: "warning" },
    { name: "对象存储同步", status: "正常", level: "success" },
  ],
  periodLabel: "统计周期：2024-04-15 – 2024-05-12",
};

const instrumentStatusLabel = {
  available: "可预约",
  maintenance: "维护中",
  retired: "已退役",
};

document.addEventListener("DOMContentLoaded", () => {
  initDashboard();
  initBookingPage();
  initInstrumentPage();
  initAnalyticsPage();
});

function initDashboard() {
  const availabilityGrid = document.querySelector("[data-availability-grid]");
  if (!availabilityGrid) return;

  updateHeroMetrics();
  renderDashboardMetrics();
  renderAvailabilityCards();
  renderReservationTable();
  renderWaitlist();
  renderMaintenanceReminders();
  populateInstrumentOptions(document.querySelector("#quickInstrument"), { keepFirstOption: true });
  wireQuickBookingForm();

  const refreshButton = document.querySelector("[data-refresh-availability]");
  if (refreshButton) {
    refreshButton.addEventListener("click", () => {
      dashboardData.availability.push(dashboardData.availability.shift());
      renderAvailabilityCards();
      refreshButton.disabled = true;
      const originalText = refreshButton.textContent;
      refreshButton.textContent = "已更新";
      setTimeout(() => {
        refreshButton.disabled = false;
        refreshButton.textContent = originalText ?? "刷新数据";
      }, 1200);
    });
  }
}

function updateHeroMetrics() {
  const reservationsMetric = document.querySelector('[data-metric="reservations-count"]');
  if (reservationsMetric) {
    reservationsMetric.textContent = String(dashboardData.reservations.length);
  }
  const maintenanceMetric = document.querySelector('[data-metric="maintenance-count"]');
  if (maintenanceMetric) {
    maintenanceMetric.textContent = String(dashboardData.maintenance.length);
  }
}

function renderDashboardMetrics() {
  document.querySelectorAll("[data-metric-card]").forEach((card) => {
    const key = card.getAttribute("data-metric-card");
    const metric = dashboardData.metrics[key];
    if (!metric) return;
    const valueEl = card.querySelector(".metric__value");
    const deltaEl = card.querySelector("[data-delta]");
    if (valueEl) valueEl.textContent = metric.value;
    if (deltaEl) deltaEl.textContent = metric.delta;
  });
}

function renderAvailabilityCards() {
  const grid = document.querySelector("[data-availability-grid]");
  if (!grid) return;
  grid.innerHTML = "";
  dashboardData.availability.forEach((item) => {
    const card = document.createElement("article");
    card.className = "availability-card";
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p class="availability-card__status" data-state="${item.status}">${formatAvailabilityStatus(item.status)}</p>
      <p>位置：${item.location}</p>
      <p>时间：${item.window}</p>
      <p>排队人数：${item.queue}</p>
    `;
    grid.appendChild(card);
  });
}

function renderReservationTable() {
  const tbody = document.querySelector("[data-reservation-list]");
  if (!tbody) return;
  tbody.innerHTML = "";
  if (!dashboardData.reservations.length) {
    tbody.innerHTML = `<tr><td colspan="5">暂无预约信息</td></tr>`;
    return;
  }

  dashboardData.reservations.forEach((reservation) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${reservation.instrumentName}</td>
      <td>${reservation.user}</td>
      <td>${formatDateRange(reservation.date, reservation.start, reservation.end)}</td>
      <td>${reservation.status}</td>
      <td><a href="bookings.html#${reservation.instrumentId}" class="button button--ghost">查看</a></td>
    `;
    tbody.appendChild(row);
  });
}

function renderWaitlist() {
  const list = document.querySelector("[data-waitlist]");
  if (!list) return;
  list.innerHTML = "";
  if (!dashboardData.waitlist.length) {
    list.innerHTML = '<li class="placeholder">暂无排队提醒。</li>';
    return;
  }
  dashboardData.waitlist.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.instrumentName}</strong> · ${item.user} · ${item.window}<br />${item.notifyBefore}`;
    list.appendChild(li);
  });
}

function renderMaintenanceReminders() {
  const list = document.querySelector("[data-maintenance-list]");
  if (!list) return;
  list.innerHTML = "";
  if (!dashboardData.maintenance.length) {
    list.innerHTML = '<li class="placeholder">暂无维护任务。</li>';
    return;
  }
  dashboardData.maintenance.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${task.instrumentName}</strong> · ${task.date}<br />事项：${task.action}（联系人：${task.contact}）`;
    list.appendChild(li);
  });
}

function wireQuickBookingForm() {
  const form = document.querySelector("[data-quick-booking]");
  if (!form) return;
  const feedback = form.querySelector("[data-booking-feedback]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const instrument = formData.get("instrument");
    const date = formData.get("date");
    const start = formData.get("start");
    const end = formData.get("end");
    const note = formData.get("note");
    const isInvalid = !instrument || !date || !start || !end || start >= end;

    if (feedback) {
      feedback.hidden = false;
      if (isInvalid) {
        feedback.textContent = "请完善预约信息，并确保结束时间晚于开始时间。";
        feedback.classList.add("form__feedback--error");
      } else {
        const selectedInstrument = getInstrumentById(instrument);
        feedback.textContent = `${selectedInstrument?.name ?? "仪器"} 的预约申请已提交，系统会在审批完成后通知您。`;
        feedback.classList.remove("form__feedback--error");
        form.reset();
        if (selectedInstrument) {
          form.querySelector("select")?.blur();
        }
      }
    }
  });
}

function initBookingPage() {
  const calendarGrid = document.querySelector("[data-calendar-grid]");
  if (!calendarGrid) return;

  const instrumentSelect = document.querySelector("#filterInstrument");
  const categorySelect = document.querySelector("#filterCategory");
  const onlyAvailableCheckbox = document.querySelector("#onlyAvailable");
  const dayButtons = Array.from(document.querySelectorAll("[data-day]"));
  const scheduleMeta = document.querySelector("[data-schedule-meta]");
  const slotDetail = document.querySelector("[data-slot-detail]");
  const bookingForm = document.querySelector("[data-advanced-booking]");
  const bookingInstrumentSelect = document.querySelector("#bookingInstrument");

  populateInstrumentOptions(instrumentSelect, { keepFirstOption: true });
  populateInstrumentOptions(bookingInstrumentSelect, { keepFirstOption: true });

  let activeInstrument = instrumentSelect?.value && instrumentSelect.value !== "all"
    ? instrumentSelect.value
    : instrumentState[0]?.id;
  if (instrumentSelect && activeInstrument) {
    instrumentSelect.value = activeInstrument;
  }

  let activeDay = dayButtons.find((btn) => btn.classList.contains("is-active"))?.dataset.day ?? scheduleDays[0];

  function renderCalendar() {
    if (!activeInstrument) {
      calendarGrid.innerHTML = '<p class="placeholder">暂无可展示的仪器排班。</p>';
      return;
    }

    const instrument = getInstrumentById(activeInstrument);
    if (scheduleMeta) {
      scheduleMeta.textContent = instrument
        ? `${instrument.name} · 负责人：${instrument.manager}`
        : "选择仪器以查看详细安排";
    }

    calendarGrid.innerHTML = "";
    const schedule = scheduleData[activeInstrument]?.schedule ?? {};

    scheduleDays.forEach((day) => {
      const column = document.createElement("div");
      column.className = "calendar-grid__column";
      if (day === activeDay) {
        column.classList.add("is-active");
      }
      column.dataset.day = day;

      const header = document.createElement("header");
      header.textContent = formatDayTitle(day);
      column.appendChild(header);

      const list = document.createElement("div");
      list.className = "slot-list";
      const rawSlots = schedule[day] ?? [];
      const filteredSlots = onlyAvailableCheckbox?.checked
        ? rawSlots.filter((slot) => slot.state === "available")
        : rawSlots;

      if (!filteredSlots.length) {
        const empty = document.createElement("p");
        empty.className = "placeholder";
        empty.textContent = onlyAvailableCheckbox?.checked ? "无空闲时段" : "暂无排班";
        list.appendChild(empty);
      } else {
        filteredSlots.forEach((slot) => {
          const slotEl = createSlotElement(slot);
          slotEl.addEventListener("click", () => {
            if (instrument) {
              renderSlotDetail(slotDetail, instrument, day, slot);
            }
          });
          list.appendChild(slotEl);
        });
      }

      column.appendChild(list);
      calendarGrid.appendChild(column);
    });
  }

  renderCalendar();

  if (instrumentSelect) {
    instrumentSelect.addEventListener("change", () => {
      const desired = instrumentSelect.value;
      if (desired === "all") {
        activeInstrument = instrumentState[0]?.id;
      } else {
        activeInstrument = desired;
      }
      if (activeInstrument && categorySelect && categorySelect.value !== "all") {
        const selectedInstrument = getInstrumentById(activeInstrument);
        if (selectedInstrument && selectedInstrument.category !== categorySelect.value) {
          categorySelect.value = "all";
        }
      }
      renderCalendar();
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", () => {
      if (categorySelect.value === "all") return;
      const matchingInstrument = instrumentState.find((item) => item.category === categorySelect.value);
      if (matchingInstrument) {
        activeInstrument = matchingInstrument.id;
        if (instrumentSelect) instrumentSelect.value = activeInstrument;
        renderCalendar();
      }
    });
  }

  if (onlyAvailableCheckbox) {
    onlyAvailableCheckbox.addEventListener("change", renderCalendar);
  }

  dayButtons.forEach((button) => {
    button.addEventListener("click", () => {
      dayButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");
      activeDay = button.dataset.day ?? scheduleDays[0];
      renderCalendar();
      const targetColumn = calendarGrid.querySelector(`[data-day="${activeDay}"]`);
      targetColumn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    });
  });

  if (bookingForm) {
    const feedback = bookingForm.querySelector("[data-advanced-feedback]");
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(bookingForm);
      const instrument = formData.get("instrument");
      const date = formData.get("date");
      const duration = formData.get("duration");
      const start = formData.get("start");
      const isInvalid = !instrument || !date || !start;

      if (feedback) {
        feedback.hidden = false;
        if (isInvalid) {
          feedback.textContent = "请补全预约信息后再次提交。";
          feedback.classList.add("form__feedback--error");
        } else {
          const instrumentInfo = getInstrumentById(instrument);
          feedback.textContent = `${instrumentInfo?.name ?? "仪器"} 的${duration} 小时预约申请已发送，审批通过后将自动同步到日历。`;
          feedback.classList.remove("form__feedback--error");
          bookingForm.reset();
        }
      }
    });
  }
}

function initInstrumentPage() {
  const tableBody = document.querySelector("[data-instrument-table]");
  if (!tableBody) return;

  const searchInput = document.querySelector("[data-search-instrument]");
  const categorySelect = document.querySelector("#instrumentCategory");
  const statusSelect = document.querySelector("#instrumentStatus");
  const managerSelect = document.querySelector("#instrumentManager");
  const countLabel = document.querySelector("[data-instrument-count]");
  const detailContainer = document.querySelector("[data-instrument-detail]");
  const newInstrumentForm = document.querySelector("[data-new-instrument]");
  const feedbackEl = newInstrumentForm?.querySelector("[data-new-instrument-feedback]");

  populateManagerOptions();
  updateInstrumentMetrics();
  renderTable();

  [searchInput, categorySelect, statusSelect, managerSelect].forEach((control) => {
    control?.addEventListener("input", renderTable);
    control?.addEventListener("change", renderTable);
  });

  tableBody.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const rowButton = target.closest("[data-view-instrument]");
    if (!rowButton) return;
    const instrumentId = rowButton.getAttribute("data-view-instrument");
    const instrument = getInstrumentById(instrumentId ?? "");
    if (instrument && detailContainer) {
      renderInstrumentDetail(detailContainer, instrument);
    }
  });

  if (newInstrumentForm) {
    newInstrumentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(newInstrumentForm);
      const name = (formData.get("name") ?? "").toString().trim();
      const code = (formData.get("code") ?? "").toString().trim();
      if (!name || !code) {
        if (feedbackEl) {
          feedbackEl.hidden = false;
          feedbackEl.textContent = "请填写仪器名称与编号。";
          feedbackEl.classList.add("form__feedback--error");
        }
        return;
      }

      const newInstrument = {
        id: code,
        name,
        code,
        category: (formData.get("category") ?? "general").toString(),
        room: (formData.get("room") ?? "").toString(),
        status: "available",
        manager: (formData.get("manager") ?? "").toString() || "待指派",
        description: (formData.get("description") ?? "").toString(),
        lastService: "待登记",
        nextMaintenance: "待安排",
        tags: ["新建仪器"],
      };

      instrumentState = [...instrumentState, newInstrument];
      populateManagerOptions(newInstrument.manager);
      updateInstrumentMetrics();
      renderTable(newInstrument.id);
      if (feedbackEl) {
        feedbackEl.hidden = false;
        feedbackEl.textContent = `${newInstrument.name} 已加入设备台账，可在日历中安排排班。`;
        feedbackEl.classList.remove("form__feedback--error");
      }
      newInstrumentForm.reset();
      renderInstrumentDetail(detailContainer, newInstrument);
    });
  }

  function populateManagerOptions(preselect) {
    if (!managerSelect) return;
    const currentValue = preselect ?? managerSelect.value ?? "all";
    const uniqueManagers = Array.from(new Set(instrumentState.map((item) => item.manager).filter(Boolean)));
    managerSelect.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "all";
    placeholder.textContent = "所有负责人";
    managerSelect.appendChild(placeholder);
    uniqueManagers.sort().forEach((manager) => {
      const option = document.createElement("option");
      option.value = manager;
      option.textContent = manager;
      managerSelect.appendChild(option);
    });
    managerSelect.value = uniqueManagers.includes(currentValue) ? currentValue : "all";
  }

  function updateInstrumentMetrics() {
    const totalCard = document.querySelector('[data-metric-card="total-instruments"] .metric__value');
    const availableCard = document.querySelector('[data-metric-card="available-instruments"] .metric__value');
    const maintenanceCard = document.querySelector('[data-metric-card="maintenance-instruments"] .metric__value');
    totalCard && (totalCard.textContent = String(instrumentState.length));
    availableCard && (availableCard.textContent = String(instrumentState.filter((item) => item.status === "available").length));
    maintenanceCard && (maintenanceCard.textContent = String(instrumentState.filter((item) => item.status === "maintenance").length));
  }

  function renderTable(focusId) {
    tableBody.innerHTML = "";
    const keyword = searchInput?.value.trim().toLowerCase() ?? "";
    const categoryFilter = categorySelect?.value ?? "all";
    const statusFilter = statusSelect?.value ?? "all";
    const managerFilter = managerSelect?.value ?? "all";

    const filtered = instrumentState.filter((instrument) => {
      const matchesKeyword = !keyword || instrument.name.toLowerCase().includes(keyword) || instrument.code.toLowerCase().includes(keyword);
      const matchesCategory = categoryFilter === "all" || instrument.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || instrument.status === statusFilter;
      const matchesManager = managerFilter === "all" || instrument.manager === managerFilter;
      return matchesKeyword && matchesCategory && matchesStatus && matchesManager;
    });

    if (countLabel) {
      countLabel.textContent = `共 ${filtered.length} 台`;
    }

    if (!filtered.length) {
      tableBody.innerHTML = '<tr><td colspan="6">未找到符合条件的仪器</td></tr>';
      return;
    }

    filtered.forEach((instrument) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${instrument.name}</td>
        <td>${instrument.code}</td>
        <td>${instrument.room || "待分配"}</td>
        <td><span class="tag" data-state="${instrument.status}">${instrumentStatusLabel[instrument.status] ?? instrument.status}</span></td>
        <td>${instrument.manager}</td>
        <td><button class="button button--ghost" type="button" data-view-instrument="${instrument.id}">查看详情</button></td>
      `;
      tableBody.appendChild(row);
    });

    const focusInstrumentId = focusId ?? filtered[0]?.id;
    const focusInstrument = getInstrumentById(focusInstrumentId ?? "");
    if (focusInstrument && detailContainer) {
      renderInstrumentDetail(detailContainer, focusInstrument);
    }
  }
}

function initAnalyticsPage() {
  const chartContainer = document.querySelector("[data-utilization-chart]");
  if (!chartContainer) return;

  document.querySelectorAll("[data-metric-card]").forEach((card) => {
    const key = card.getAttribute("data-metric-card");
    const metric = analyticsData.metrics[key];
    if (!metric) return;
    const valueEl = card.querySelector(".metric__value");
    const deltaEl = card.querySelector("[data-delta]");
    if (valueEl) valueEl.textContent = metric.value;
    if (deltaEl) deltaEl.textContent = metric.delta;
  });

  chartContainer.querySelectorAll("[data-chart]").forEach((chartEl) => {
    const key = chartEl.getAttribute("data-chart");
    const bars = analyticsData.utilization[key] ?? [];
    const barWrapper = chartEl.querySelector(".chart__bars");
    if (!barWrapper) return;
    barWrapper.innerHTML = "";
    bars.forEach((item, index) => {
      const bar = document.createElement("div");
      bar.className = "chart__bar";
      bar.setAttribute("data-size", item.size ?? "md");
      if (index === bars.length - 1) {
        bar.setAttribute("data-variant", "success");
      }
      bar.setAttribute("data-label", `${item.label} ${item.value}`);
      barWrapper.appendChild(bar);
    });
  });

  const topUsageBody = document.querySelector("[data-top-usage]");
  if (topUsageBody) {
    topUsageBody.innerHTML = "";
    analyticsData.topUsage.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.rank}</td>
        <td>${entry.instrumentName}</td>
        <td>${entry.duration}</td>
        <td>${entry.count}</td>
        <td>${entry.utilization}</td>
      `;
      topUsageBody.appendChild(row);
    });
  }

  const periodLabel = document.querySelector("[data-top-usage-period]");
  if (periodLabel) {
    periodLabel.textContent = analyticsData.periodLabel;
  }

  const violationList = document.querySelector("[data-violation-list]");
  if (violationList) {
    violationList.innerHTML = "";
    if (!analyticsData.violations.length) {
      violationList.innerHTML = '<li class="placeholder">本月暂无违规事件。</li>';
    } else {
      analyticsData.violations.forEach((violation) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${violation.date}</strong> · ${violation.user} · ${violation.instrumentName}<br />类型：${violation.type}，处理：${violation.action}`;
        violationList.appendChild(li);
      });
    }
  }

  const dataHealthContainer = document.querySelector("[data-data-health]");
  if (dataHealthContainer) {
    dataHealthContainer.innerHTML = "";
    analyticsData.dataHealth.forEach((item) => {
      const div = document.createElement("div");
      div.className = "data-health__item";
      div.innerHTML = `<strong>${item.name}</strong><span>${item.status}</span>`;
      if (item.level === "warning") {
        div.style.borderColor = "var(--color-warning)";
      }
      dataHealthContainer.appendChild(div);
    });
  }
}

function renderSlotDetail(container, instrument, day, slot) {
  if (!container) return;
  container.innerHTML = `
    <h3>${instrument.name}</h3>
    <p>${formatDateRange(day, slot.start, slot.end)}</p>
    <p>${describeSlot(slot)}</p>
    ${slot.purpose ? `<p>用途：${slot.purpose}</p>` : ""}
    <p>负责人：${instrument.manager}</p>
  `;
}

function renderInstrumentDetail(container, instrument) {
  if (!container) return;
  const nextSlot = findNextReservedSlot(instrument.id);
  const tags = instrument.tags?.map((tag) => `<span class="tag">${tag}</span>`).join(" ") ?? "";
  container.innerHTML = `
    <div class="instrument-detail__header">
      <h3>${instrument.name}</h3>
      <span class="tag" data-state="${instrument.status}">${instrumentStatusLabel[instrument.status] ?? instrument.status}</span>
    </div>
    <p>${instrument.description || "暂无简介"}</p>
    <ul class="detail-list">
      <li><strong>编号：</strong>${instrument.code}</li>
      <li><strong>房间：</strong>${instrument.room || "待分配"}</li>
      <li><strong>负责人：</strong>${instrument.manager}</li>
      <li><strong>上次维护：</strong>${instrument.lastService}</li>
      <li><strong>下次维护：</strong>${instrument.nextMaintenance}</li>
    </ul>
    ${tags ? `<p>${tags}</p>` : ""}
    ${nextSlot ? `<p>下一次预约：${formatDateRange(nextSlot.day, nextSlot.start, nextSlot.end)} · ${nextSlot.owner ?? "空闲"}</p>` : "<p>暂无预约，欢迎安排使用。</p>"}
  `;
}

function populateInstrumentOptions(select, { keepFirstOption = false } = {}) {
  if (!select) return;
  const firstOption = keepFirstOption ? select.querySelector("option") : null;
  select.innerHTML = "";
  if (firstOption) {
    select.appendChild(firstOption);
  }
  instrumentState.forEach((instrument) => {
    const option = document.createElement("option");
    option.value = instrument.id;
    option.textContent = `${instrument.name} · ${instrument.code}`;
    select.appendChild(option);
  });
}

function createSlotElement(slot) {
  const slotEl = document.createElement("button");
  slotEl.type = "button";
  slotEl.className = "slot";
  slotEl.setAttribute("data-state", slot.state);

  const time = document.createElement("span");
  time.className = "slot__time";
  time.textContent = `${slot.start} – ${slot.end}`;
  slotEl.appendChild(time);

  const summary = document.createElement("p");
  summary.textContent = describeSlot(slot);
  slotEl.appendChild(summary);

  if (slot.state === "reserved" && slot.purpose) {
    const meta = document.createElement("p");
    meta.textContent = `用途：${slot.purpose}`;
    slotEl.appendChild(meta);
  }

  return slotEl;
}

function describeSlot(slot) {
  if (slot.state === "available") {
    return slot.note ?? "空闲时段，可快速预约";
  }
  if (slot.state === "maintenance") {
    return slot.purpose ? `维护：${slot.purpose}` : "维护窗口";
  }
  return slot.owner ? `预约人：${slot.owner}（${slot.status ?? "待确认"}）` : "预约已锁定";
}

function findNextReservedSlot(instrumentId) {
  const schedule = scheduleData[instrumentId]?.schedule;
  if (!schedule) return undefined;
  for (const day of scheduleDays) {
    const slots = schedule[day] ?? [];
    const reserved = slots.find((slot) => slot.state === "reserved");
    if (reserved) {
      return { day, ...reserved };
    }
  }
  return undefined;
}

function formatAvailabilityStatus(status) {
  if (status === "available") return "可预约";
  if (status === "busy") return "预约紧张";
  if (status === "maintenance") return "维护中";
  return status;
}

function getInstrumentById(id) {
  return instrumentState.find((instrument) => instrument.id === id);
}

function formatDateRange(dateStr, start, end) {
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return `${dateStr} ${start} – ${end}`;
  }
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day} ${start} – ${end}`;
}

function formatDayTitle(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateStr;
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${WEEKDAYS[date.getDay()]} ${month}/${day}`;
}
