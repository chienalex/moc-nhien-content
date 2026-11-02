// Nội dung website. Danh mục bám theo "Bảng báo giá dịch vụ Marketing Online" của Mộc Nhiên.
// Quy tắc: KHÔNG đưa giá lên website — giá được báo riêng sau khi tư vấn.

const site = {
  name: 'Mộc Nhiên Content',
  shortName: 'Mộc Nhiên',
  tagline: 'Nội dung mộc, chuyển đổi thật.',
  description:
    'Mộc Nhiên Content cung cấp dịch vụ chạy quảng cáo Facebook Ads, viết bài quảng cáo cho Ads thủ, chăm sóc Fanpage và tư vấn marketing online.',
  phone: '0964646205',
  phoneDisplay: '0964.646.205',
  zalo: 'https://zalo.me/0964646205',
  url: process.env.SITE_URL || 'http://localhost:3000',
};

const industries = [
  'Thời trang & phụ kiện',
  'Mỹ phẩm & làm đẹp',
  'Spa / thẩm mỹ viện',
  'Ăn uống (F&B) / nhà hàng',
  'Giáo dục / khoá học',
  'Bất động sản',
  'Nội thất / xây dựng',
  'Mẹ & bé',
  'Sức khoẻ / thực phẩm',
  'Công nghệ / phần mềm',
  'Du lịch / khách sạn',
  'Dịch vụ địa phương',
  'Ads thủ / Agency',
  'Lĩnh vực khác',
];

const services = [
  {
    slug: 'quang-cao-facebook-ads',
    number: '01',
    icon: 'target',
    name: 'Chạy quảng cáo Facebook Ads',
    navName: 'Quảng cáo Facebook',
    short: 'Thiết lập, tối ưu và báo cáo chiến dịch mỗi ngày — ngân sách nạp thẳng vào tài khoản của bạn.',
    headline: 'Mỗi đồng ngân sách đều phải làm việc.',
    intro:
      'Mộc Nhiên nghiên cứu tệp khách, dựng chiến dịch và tối ưu hằng ngày để quảng cáo ra đơn đều, không đốt tiền. Ngân sách do bạn nạp trực tiếp vào tài khoản quảng cáo — minh bạch tuyệt đối.',
    highlights: [
      'Ngân sách nạp thẳng vào tài khoản của bạn',
      'Báo cáo định kỳ, số liệu rõ ràng',
      'Cài Pixel, tài khoản doanh nghiệp, tệp đối tượng',
    ],
    tiersTitle: 'Lộ trình theo quy mô ngân sách',
    tiersNote: 'Phạm vi công việc mở rộng theo ngân sách quảng cáo hằng tháng. Phí dịch vụ được báo riêng sau buổi tư vấn.',
    tiers: [
      {
        name: 'Khởi động',
        meta: 'Ngân sách dưới 10 triệu/tháng',
        items: ['Nghiên cứu tệp khách hàng', 'Thiết lập chiến dịch', 'Tối ưu hằng ngày', 'Báo cáo hằng tuần'],
      },
      {
        name: 'Tăng tốc',
        meta: 'Ngân sách 10 – 30 triệu/tháng',
        items: ['Toàn bộ gói Khởi động', 'Test A/B mẫu quảng cáo', 'Cài đặt Pixel', 'Tệp đối tượng tương tự'],
        featured: true,
      },
      {
        name: 'Mở rộng',
        meta: 'Ngân sách 30 – 100 triệu/tháng',
        items: ['Toàn bộ gói Tăng tốc', 'Chiến lược phễu chuyển đổi', 'Remarketing', 'Báo cáo chi tiết theo ngày'],
      },
      {
        name: 'Doanh nghiệp',
        meta: 'Ngân sách trên 100 triệu/tháng',
        items: ['Toàn bộ gói Mở rộng', 'Nhân sự chuyên trách', 'Họp chiến lược hằng tháng'],
      },
    ],
    extras: ['Hỗ trợ cài đặt ban đầu: Pixel, tài khoản doanh nghiệp, tệp đối tượng — ưu đãi khi đồng hành từ 3 tháng.'],
    form: {
      choiceLabel: 'Bạn cần hỗ trợ những hạng mục nào?',
      choices: [
        'Thiết lập & chạy chiến dịch mới',
        'Tối ưu chiến dịch đang chạy',
        'Test A/B mẫu quảng cáo',
        'Cài Pixel & tài khoản doanh nghiệp',
        'Phễu chuyển đổi & remarketing',
        'Báo cáo chi tiết theo ngày',
      ],
      extraLabel: 'Ngân sách quảng cáo dự kiến mỗi tháng',
      extraOptions: ['Dưới 10 triệu', '10 – 30 triệu', '30 – 100 triệu', 'Trên 100 triệu', 'Chưa xác định'],
    },
    faqs: [
      {
        q: 'Tôi có phải đưa tiền ngân sách cho Mộc Nhiên không?',
        a: 'Không. Ngân sách quảng cáo do bạn nạp trực tiếp vào tài khoản quảng cáo của mình. Mộc Nhiên chỉ quản lý và tối ưu chiến dịch.',
      },
      {
        q: 'Bao lâu thì nhận được báo cáo?',
        a: 'Tối thiểu báo cáo hằng tuần. Với ngân sách lớn, Mộc Nhiên gửi báo cáo chi tiết theo ngày.',
      },
      {
        q: 'Ngành nào không nhận chạy?',
        a: 'Mộc Nhiên không nhận ngành hàng vi phạm chính sách quảng cáo Facebook hoặc pháp luật.',
      },
    ],
  },
  {
    slug: 'viet-bai-quang-cao',
    number: '02',
    icon: 'pen',
    name: 'Viết bài quảng cáo cho Ads thủ',
    navName: 'Viết bài quảng cáo',
    short: 'Bài viết tối ưu chuyển đổi, đúng chính sách Facebook, giao trong 24–48 giờ.',
    headline: 'Content đủ sắc để Ads thủ chỉ việc bấm chạy.',
    intro:
      'Mỗi bài được viết để bán: hook dừng tay lướt, thân bài chạm đúng nỗi đau, lời kêu gọi rõ ràng — và luôn nằm trong chính sách quảng cáo Facebook để tài khoản của bạn an toàn.',
    highlights: ['Giao bài trong 24–48 giờ', 'Đúng chính sách quảng cáo Facebook', 'Nhiều góc tiếp cận để test'],
    tiersTitle: 'Các gói bài viết',
    tiersNote: 'Chọn theo nhu cầu test hay chạy đều. Bài dài dạng storytelling (trên 500 chữ) có thể bổ sung vào bất kỳ gói nào.',
    tiers: [
      { name: 'Bài lẻ', meta: '1 bài', items: ['Bài 150–300 chữ', '1 lần chỉnh sửa'] },
      { name: 'Gói test', meta: '5 bài', items: ['5 góc tiếp cận khác nhau', 'Phù hợp để test mẫu quảng cáo'] },
      { name: 'Gói Ads thủ', meta: '15 bài', items: ['Kèm 3 tiêu đề mỗi bài', '2 lần chỉnh sửa'], featured: true },
      { name: 'Gói đại lý', meta: '30 bài', items: ['Ưu tiên giao nhanh', 'Đa ngành hàng'] },
      { name: 'Kịch bản video ngắn', meta: '1 kịch bản', items: ['Reels / TikTok 30–60 giây', 'Kèm lời thoại'] },
    ],
    extras: ['Bài dài dạng storytelling (trên 500 chữ) cho sản phẩm cần kể chuyện.'],
    form: {
      choiceLabel: 'Bạn quan tâm gói nào?',
      choices: [
        'Bài lẻ (1 bài)',
        'Gói test (5 bài)',
        'Gói Ads thủ (15 bài)',
        'Gói đại lý (30 bài)',
        'Kịch bản video ngắn',
        'Bài dài storytelling',
      ],
    },
    faqs: [
      {
        q: 'Bao lâu thì nhận được bài?',
        a: 'Thông thường 24–48 giờ sau khi bạn gửi đủ thông tin sản phẩm. Gói đại lý được ưu tiên giao nhanh.',
      },
      {
        q: 'Bài có bị Facebook từ chối không?',
        a: 'Bài được viết theo chính sách quảng cáo Facebook, tránh từ ngữ nhạy cảm và cam kết quá đà để giảm tối đa rủi ro bị từ chối.',
      },
      {
        q: 'Tôi có được chỉnh sửa bài không?',
        a: 'Có. Mỗi gói có số lần chỉnh sửa riêng — từ 1 lần với bài lẻ đến 2 lần với gói Ads thủ.',
      },
    ],
  },
  {
    slug: 'cham-soc-fanpage',
    number: '03',
    icon: 'leaf',
    name: 'Chăm sóc Fanpage',
    navName: 'Chăm sóc Fanpage',
    short: 'Lên kế hoạch, viết và đăng bài đều đặn mỗi tháng để Fanpage luôn sống.',
    headline: 'Fanpage đều tay, khách hàng nhớ mặt.',
    intro:
      'Mộc Nhiên lo trọn từ kế hoạch nội dung, viết bài, thiết kế ảnh đến đăng bài theo lịch. Bạn tập trung bán hàng — Fanpage vẫn đăng đều, trả lời đúng lúc và có báo cáo rõ ràng.',
    highlights: ['Kế hoạch nội dung theo tháng', 'Đăng bài đúng lịch', 'Ưu đãi khi đồng hành dài hạn'],
    tiersTitle: 'Gói chăm sóc theo tháng',
    tiersNote: 'Đã bao gồm lên kế hoạch nội dung và đăng bài. Có ưu đãi riêng cho hợp đồng từ 3 tháng và từ 6 tháng.',
    tiers: [
      {
        name: 'Cơ bản',
        meta: '12 bài/tháng',
        items: ['Kế hoạch nội dung', 'Viết bài', 'Ảnh thiết kế đơn giản', 'Đăng bài'],
      },
      {
        name: 'Tiêu chuẩn',
        meta: '20 bài/tháng',
        items: ['Toàn bộ gói Cơ bản', 'Trả lời bình luận, tin nhắn giờ hành chính', 'Báo cáo tháng'],
        featured: true,
      },
      {
        name: 'Chuyên nghiệp',
        meta: '30 bài/tháng',
        items: ['Toàn bộ gói Tiêu chuẩn', '4 video ngắn', 'Minigame / sự kiện', 'Tối ưu thông tin Fanpage'],
      },
    ],
    extras: [],
    form: {
      choiceLabel: 'Bạn quan tâm gói nào?',
      choices: ['Gói Cơ bản (12 bài/tháng)', 'Gói Tiêu chuẩn (20 bài/tháng)', 'Gói Chuyên nghiệp (30 bài/tháng)'],
      extraLabel: 'Thời gian dự kiến đồng hành',
      extraOptions: ['1 tháng', '3 tháng', '6 tháng trở lên', 'Chưa xác định'],
    },
    faqs: [
      {
        q: 'Tôi có cần duyệt bài trước khi đăng không?',
        a: 'Có. Kế hoạch nội dung được gửi trước để bạn duyệt, sau đó Mộc Nhiên đăng theo lịch đã thống nhất.',
      },
      {
        q: 'Có hỗ trợ trả lời tin nhắn khách không?',
        a: 'Gói Tiêu chuẩn và Chuyên nghiệp bao gồm trả lời bình luận và tin nhắn trong giờ hành chính.',
      },
      {
        q: 'Ký dài hạn có lợi gì?',
        a: 'Hợp đồng từ 3 tháng và từ 6 tháng có mức ưu đãi riêng. Mộc Nhiên sẽ báo cụ thể khi tư vấn.',
      },
    ],
  },
  {
    slug: 'tu-van-marketing-online',
    number: '04',
    icon: 'compass',
    name: 'Tư vấn marketing online',
    navName: 'Tư vấn marketing',
    short: 'Từ một buổi gỡ rối nhanh đến đồng hành cả tháng — đúng vấn đề, đúng hướng.',
    headline: 'Nhìn đúng vấn đề trước khi tiêu thêm một đồng.',
    intro:
      'Khi quảng cáo không ra đơn hay Fanpage đứng yên, thứ bạn cần là một góc nhìn rõ ràng. Mộc Nhiên audit, chỉ ra lỗi, lập kế hoạch và đồng hành cùng bạn điều chỉnh theo số liệu.',
    highlights: ['Tư vấn online linh hoạt', 'Chỉ ra lỗi và hướng khắc phục', 'Kế hoạch dựa trên số liệu'],
    tiersTitle: 'Hình thức tư vấn',
    tiersNote: 'Chọn hình thức phù hợp với giai đoạn kinh doanh hiện tại của bạn.',
    tiers: [
      {
        name: 'Tư vấn nhanh',
        meta: '60 phút online',
        items: ['Giải đáp vấn đề cụ thể', 'Quảng cáo, nội dung, Fanpage'],
      },
      {
        name: 'Audit tài khoản',
        meta: '2–3 ngày',
        items: ['Đánh giá tài khoản quảng cáo / Fanpage', 'Báo cáo lỗi và hướng khắc phục'],
      },
      {
        name: 'Lập kế hoạch marketing',
        meta: '1 tháng triển khai',
        items: ['Phân tích tệp khách, đối thủ', 'Kế hoạch nội dung và ngân sách'],
        featured: true,
      },
      {
        name: 'Đồng hành theo tháng',
        meta: '4 buổi/tháng',
        items: ['Tư vấn định kỳ', 'Theo dõi số liệu', 'Điều chỉnh chiến lược'],
      },
    ],
    extras: [],
    form: {
      choiceLabel: 'Bạn muốn tư vấn theo hình thức nào?',
      choices: [
        'Tư vấn nhanh 60 phút',
        'Audit tài khoản quảng cáo / Fanpage',
        'Lập kế hoạch marketing',
        'Đồng hành theo tháng',
      ],
    },
    faqs: [
      {
        q: 'Tư vấn diễn ra như thế nào?',
        a: 'Tư vấn online qua Zalo hoặc Google Meet. Bạn gửi trước vấn đề và số liệu để buổi tư vấn đi thẳng vào trọng tâm.',
      },
      {
        q: 'Audit cần những gì?',
        a: 'Bạn cấp quyền xem tài khoản quảng cáo hoặc Fanpage. Sau 2–3 ngày, bạn nhận báo cáo đánh giá kèm hướng khắc phục.',
      },
    ],
  },
];

const steps = [
  { title: 'Gửi thông tin', text: 'Bạn điền form: sản phẩm, lĩnh vực và hạng mục cần hỗ trợ.' },
  { title: 'Tư vấn & báo giá riêng', text: 'Mộc Nhiên liên hệ qua Zalo hoặc điện thoại, đề xuất gói phù hợp và báo giá chính thức.' },
  { title: 'Triển khai', text: 'Gửi bài, chạy chiến dịch, đăng Fanpage theo đúng lịch đã thống nhất.' },
  { title: 'Báo cáo & nghiệm thu', text: 'Báo cáo minh bạch, chỉnh sửa trong phạm vi từng gói cho đến khi bạn hài lòng.' },
];

const promises = [
  { icon: 'clock', title: 'Giao bài 24–48 giờ', text: 'Đủ nhanh để bạn kịp lên chiến dịch, đủ kỹ để bài chạy được.' },
  { icon: 'shield', title: 'Đúng chính sách Facebook', text: 'Nội dung an toàn cho tài khoản quảng cáo của bạn.' },
  { icon: 'chart', title: 'Báo cáo minh bạch', text: 'Số liệu rõ ràng theo tuần, theo ngày — không mập mờ.' },
  { icon: 'wallet', title: 'Ngân sách trong tay bạn', text: 'Tiền quảng cáo nạp thẳng vào tài khoản của chính bạn.' },
];

const homeFaqs = [
  {
    q: 'Vì sao website không ghi giá?',
    a: 'Mỗi ngành hàng, khối lượng công việc và mục tiêu đều khác nhau. Mộc Nhiên tư vấn trước rồi mới báo giá chính thức để bạn trả đúng cho thứ mình cần.',
  },
  {
    q: 'Sau khi gửi form bao lâu thì được liên hệ?',
    a: 'Trong giờ hành chính, Mộc Nhiên thường liên hệ lại trong ngày qua Zalo hoặc số điện thoại bạn để lại.',
  },
  {
    q: 'Mộc Nhiên có nhận mọi ngành hàng không?',
    a: 'Không nhận ngành hàng vi phạm chính sách Facebook hoặc pháp luật. Các ngành còn lại đều có thể trao đổi.',
  },
  {
    q: 'Có thể đăng ký nhiều dịch vụ cùng lúc không?',
    a: 'Được. Bạn có thể gửi form ở từng dịch vụ, hoặc nhắn Zalo để Mộc Nhiên gom thành một kế hoạch tổng.',
  },
];

function findService(slug) {
  return services.find((s) => s.slug === slug);
}

module.exports = { site, industries, services, steps, promises, homeFaqs, findService };
