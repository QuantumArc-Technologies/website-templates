/** LiftFlow content (www.liftflowglobal.com + company profile) used by template 06. */
const A = '/templates/liftflow-global-website/assets/'
export const IMG = {
  wireRope: A + 'a063c05bd2.webp',
  ropeSocket: A + '186fd7187a.webp',
  hooksAssortment: A + 'de27ce2309.webp',
  hooksFlatlay: A + '14b3de6eac.webp',
  pipeSling: A + 'fae2c5f5c9.webp',
  electricHoist: A + '5706e1c358.webp',
  offshoreFrame: A + 'e63e3f82b2.webp',
  crateLift: A + 'c904657135.webp',
  offshoreCrane: A + '1bc7774991.webp',
  workshopWorker: A + '1021528f77.webp',
  ropeAccess: A + 'd54b8a520c.webp',
  offshoreRig: A + '09506b919a.webp',
  supplyVessel: A + '3b17f5e2b0.webp',
  craneSunset: A + 'f01e8fbc4a.webp',
  forklift: A + 'd4f192b6ce.webp',
  workerClimb: A + '4e6c859f8a.webp',
}
export const PROFILE_PDF = A + '6a9adf6202.pdf'
export const LOGO = '/templates/shared/logo.webp'

export const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services', menu: true },
  { label: 'Products', href: '#products' },
  { label: 'Industries', href: '#industries', menu: true },
  { label: 'Contact', href: '#contact' },
]

export const ABOUT = {
  p1: 'Lift Flow Global provides lifting, rigging, material handling, and engineered lifting solutions for the Marine, Offshore, Oil & Gas, Construction, Industrial, Logistics, and Infrastructure sectors across the Middle East.',
  p2: 'Committed to safety, reliability, and technical excellence, we deliver high-quality products and tailored solutions that enhance operational safety, efficiency, and productivity through strong industry partnerships and a customer-focused approach.',
  vision:
    'To become the most trusted lifting and rigging solutions provider in the Middle East by delivering superior quality products, innovative solutions, technical expertise, and exceptional customer service.',
  mission: [
    'Deliver safe, reliable, and compliant lifting solutions',
    'Supply certified products from reputable global manufacturers',
    'Support customers with technical expertise and engineering assistance',
    'Develop long-term partnerships built on trust and performance',
    'Promote safe lifting practices across all industries',
    'Continuously improve operational efficiency and service excellence',
  ],
}

export const FACTS = [
  { n: '52', l: 'Product lines across 8 categories' },
  { n: '07', l: 'Industries served in the Middle East' },
  { n: '03', l: 'ISO management systems certified' },
  { n: 'ICV', l: 'Registered under the ADNOC In-Country Value programme' },
]

export const STRENGTHS = [
  { name: 'Experienced Team', desc: 'Experienced professionals delivering customized, reliable, and timely solutions.' },
  { name: 'Technical Expertise', desc: 'Strong technical knowledge and industry experience across diverse sectors and applications.' },
  { name: 'Continuous Development', desc: 'Ongoing professional training and commitment to industry best practices.' },
  { name: 'Client-Focused Approach', desc: 'Long-standing client relationships built on dependable service and technical support.' },
  { name: 'Global Supply Network', desc: 'Access to leading manufacturers and trusted international supply partners.' },
]

export const SERVICES = [
  { name: 'Lifting Equipment Solutions', desc: 'Complete lifting equipment for industrial, marine, offshore, and construction applications.', img: IMG.offshoreCrane },
  { name: 'Rigging Hardware Supply', desc: 'Certified rigging hardware and lifting accessories for safe and reliable lifting operations.', img: IMG.hooksFlatlay },
  { name: 'Material Handling Equipment', desc: 'Hoists · Chain Blocks · Clamps · Trolleys · Lifting Magnets · Hydraulic Jacks', img: IMG.electricHoist },
  { name: 'Engineered Lifting Assemblies', desc: 'Custom lifting assemblies designed to meet specific load and project requirements.', img: IMG.crateLift },
  { name: 'Project Support Services', desc: 'Technical assistance from inquiry and product selection through to delivery.', img: IMG.workshopWorker },
  { name: 'Technical Consultation', desc: 'Equipment Selection · Compliance Guidance · Engineering Recommendations · Lifting Solutions Development', img: IMG.ropeAccess },
]

export const CATS = [
  { id: 'wire-rope', name: 'Wire Rope Products', img: IMG.wireRope, blurb: 'Galvanized and ungalvanized ropes for crane, elevator and heavy-lift duty.',
    items: ['Galvanized Wire Rope', 'Ungalvanized Wire Rope', 'Rotation Resistant Wire Rope', 'Crane Wire Rope', 'Elevator Wire Rope', 'Stainless Steel Wire Rope', 'Compacted Wire Rope', 'Plastic Impregnated Wire Rope'] },
  { id: 'assemblies', name: 'Wire Rope Assemblies', img: IMG.ropeSocket, blurb: 'Spliced, socketed and grommet assemblies made to your load and length.',
    items: ['Flemish Eye Wire Rope Slings', 'Hand-Spliced Slings', 'Mechanical Spliced Slings', 'Grommet Slings', 'Endless Wire Rope Slings', 'Socketed Wire Rope Assemblies'] },
  { id: 'chain', name: 'Chain Sling Systems', img: IMG.hooksAssortment, blurb: 'Grade 80 and Grade 100 chain slings in single through four-leg configurations.',
    items: ['Single Leg Chain Slings', 'Two Leg Chain Slings', 'Three Leg Chain Slings', 'Four Leg Chain Slings', 'Endless Chain Slings', 'Grade 80 Components', 'Grade 100 Components'] },
  { id: 'hardware', name: 'Lifting Hardware', img: IMG.hooksFlatlay, blurb: 'Certified connecting hardware — the load path between rope, chain and hook.',
    items: ['Shackles', 'Hooks', 'Master Links', 'Connecting Links', 'Swivel Components', 'Eye Bolts', 'Turnbuckles', 'Thimbles', 'Wire Rope Clips', 'Ferrules'] },
  { id: 'synthetic', name: 'Synthetic Lifting Products', img: IMG.pipeSling, blurb: 'Soft slings for finished surfaces and lighter, faster rigging.',
    items: ['Webbing Slings', 'Round Slings', 'Polyester Slings', 'Endless Slings'] },
  { id: 'handling', name: 'Material Handling Equipment', img: IMG.electricHoist, blurb: 'Hoists, blocks, clamps and jacks for workshop and site handling.',
    items: ['Chain Blocks', 'Lever Hoists', 'Beam Clamps', 'Trolleys', 'Lifting Magnets', 'Plate Clamps', 'Hydraulic Jacks'] },
  { id: 'marine', name: 'Marine & Offshore Equipment', img: IMG.offshoreFrame, blurb: 'DNV certified components and fittings for offshore lifting and mooring.',
    items: ['DNV Certified Lifting Components', 'Offshore Container Fittings', 'Pad Eyes', 'Lifting Points', 'Mooring Accessories', 'Offshore Rigging Equipment'] },
  { id: 'custom', name: 'Custom Engineered Solutions', img: IMG.crateLift, blurb: 'Project-specific assemblies engineered around your load, geometry and standard.',
    items: ['Project Specific Lifting Assemblies', 'Customized Rigging Systems', 'Heavy Lift Assemblies', 'Special Fabricated Lifting Components'] },
]

export const FAVORITES = [
  'Portable Scissor Car Lift Table',
  'Manual Scissor Lift Table',
  'Easily Operated Cable Clamp Wire Rope Grip',
  'Aluminum & Magnesium Alloy Cable Clamp',
  'Ratchet Wire Rope Cable Hand Puller',
  'American Cable Clamp Wire Rope Grip',
  'Cable Clamp Wire Rope Grip',
  'Y4 Anti-Collision Manual Plain Trolley',
]

export const INDUSTRIES = [
  { name: 'Oil & Gas', desc: 'Reliable lifting solutions for upstream, midstream, and downstream operations.', img: IMG.offshoreRig, tags: ['Upstream', 'Midstream', 'Downstream'] },
  { name: 'Marine & Offshore', desc: 'Certified equipment designed for demanding marine and offshore environments.', img: IMG.supplyVessel, tags: ['DNV certified', 'Mooring', 'Container fittings'] },
  { name: 'Construction', desc: 'Lifting and material handling products for infrastructure and construction projects.', img: IMG.craneSunset, tags: ['Infrastructure', 'Tower crane', 'Site rigging'] },
  { name: 'Piling & Foundation', desc: 'Specialized lifting equipment for foundation and piling applications.', img: IMG.offshoreFrame, tags: ['Pile handling', 'Heavy lift', 'Custom assemblies'] },
  { name: 'Industrial Manufacturing', desc: 'Efficient lifting and handling solutions for manufacturing facilities.', img: IMG.workshopWorker, tags: ['Workshop', 'Maintenance', 'Below-the-hook'] },
  { name: 'Ports & Logistics', desc: 'Equipment for cargo handling, warehousing, and transportation operations.', img: IMG.forklift, tags: ['Cargo handling', 'Warehousing', 'Transport'] },
  { name: 'Power & Utilities', desc: 'Lifting products for maintenance, installation, and shutdown projects.', img: IMG.ropeAccess, tags: ['Shutdown', 'Installation', 'Maintenance'] },
]

export const WHY = [
  { name: 'Extensive Industry Knowledge', desc: 'Deep expertise across Marine, Offshore, Oil & Gas, Construction, Piling and Logistics sectors.' },
  { name: 'Premium Quality Products', desc: 'Partnerships with reputable global manufacturers and certified products meeting international standards.' },
  { name: 'Tailored Engineering Solutions', desc: 'Customized lifting and rigging solutions engineered around your unique challenges.' },
  { name: 'Commitment to Safety & Compliance', desc: 'A relentless focus on quality assurance, certification and industry best practices.' },
  { name: 'Reliable Supply & Technical Support', desc: 'Timely delivery backed by responsive, knowledgeable technical service.' },
  { name: 'Partnership Built on Trust', desc: 'Long-term relationships built through professionalism, transparency and performance.' },
]

export const CERTS = [
  { std: 'ISO 9001:2015', name: 'Quality Management System', no: '220426019714' },
  { std: 'ISO 14001:2015', name: 'Environmental Management System', no: '220426029715' },
  { std: 'ISO 45001:2018', name: 'Occupational Health & Safety Management System', no: '220426039716' },
]

export const DOCS = [
  'Manufacturer Test Certificates',
  'Proof Load Test Certificates',
  'Third-Party Inspection Reports',
  'Material Traceability Documentation',
  'Certificate of Conformity',
  'Classification Society Certifications',
]

export const CONTACT = {
  company: 'Lift Flow Lifting Equipment Trading LLC',
  address: ['Plot 21, MW-05 St.', 'At Tiblaghah 2 St.', 'Musaffah, Abu Dhabi, UAE'],
  phones: ['+971 24 916 117', '+971 50 802 9108', '+971 52 725 4241'],
  emails: ['info@liftflowglobal.com', 'siva@liftflowglobal.com'],
  whatsapp: 'https://wa.me/971508029108',
  site: 'www.liftflowglobal.com',
  map: 'https://www.google.com/maps?q=Musaffah+Industrial+Area+Abu+Dhabi+UAE&z=13&output=embed',
}
