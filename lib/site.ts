const role = "IT Administrator";
const specialism =
  "System Administration, Infrastructure, Microsoft 365 & Security Operations";

export const site = {
  name: "Kristopher Villanueva",
  shortName: "Kristopher Villanueva",
  role,
  specialism,
  headline: `${role} - ${specialism}`,
  location: "Mandaluyong City, Metro Manila, Philippines",
  locationShort: "Metro Manila, PH",
  timezone: "GMT+8",
  email: "kristopher.m.villanueva@gmail.com",
  linkedin: "https://www.linkedin.com/in/kristopher-villanueva-51a050a7",
  availability: "Open to infrastructure and systems administration roles",

  intro:
    "I run the infrastructure behind a mid-sized architecture practice: Windows Server and Hyper-V, Active Directory, FortiGate and OPNsense firewalls, and a TrueNAS backup estate. I document what I build, test the recovery paths, and write down what I could not verify.",

  about: [
    "I started in university systems administration, moved through remote application support for veterinary clinics across four countries, and into a global service desk before taking ownership of infrastructure at an architecture practice in Makati.",
    "My current role covers the full breadth of a small IT department: Microsoft 365 administration, user lifecycle, procurement and asset management, network segmentation, Windows Server and Hyper-V maintenance, and business continuity. I also mentor an IT assistant and set the day-to-day workload.",
    "The work I am most proud of is not a single product. It is the habit of building something, writing the procedure, testing the recovery, and being precise about the difference between those three things.",
  ],

  principles: [
    {
      title: "Document while building",
      body: "A configuration nobody can reproduce is a single point of failure. Every change leaves behind a procedure someone else can follow.",
    },
    {
      title: "Test the recovery, not the backup",
      body: "A green backup job proves data was written. Only a restore proves the data is usable. Those are different claims and I keep them separate.",
    },
    {
      title: "Say what was not verified",
      body: "Untested assumptions are the expensive kind. Anything not proven gets labelled, not rounded up into a success story.",
    },
  ],

  skills: [
    {
      key: "infrastructure",
      title: "Systems & Infrastructure",
      items: [
        "Windows Server",
        "Active Directory",
        "Group Policy",
        "DNS / DHCP",
        "Hyper-V",
        "TrueNAS",
        "Server administration",
      ],
    },
    {
      key: "m365",
      title: "Microsoft 365 & Identity",
      items: [
        "Microsoft 365 administration",
        "Exchange Online",
        "SharePoint",
        "Teams",
        "OneDrive",
        "User lifecycle",
        "Access management",
        "Licensing",
      ],
    },
    {
      key: "network",
      title: "Networking & Security",
      items: [
        "LAN / WAN",
        "VLAN segmentation",
        "FortiGate",
        "OPNsense",
        "OpenVPN",
        "Managed switches",
        "IP address management",
        "Kaspersky Endpoint Security",
      ],
    },
    {
      key: "backup",
      title: "Backup & Disaster Recovery",
      items: [
        "Veeam Backup & Replication",
        "TrueNAS / OpenZFS",
        "RAID-Z2",
        "Windows Server Backup",
        "Replication",
        "Restore testing",
        "Backup validation",
        "DR & BC documentation",
      ],
    },
    {
      key: "operations",
      title: "IT Operations & Service Desk",
      items: [
        "Incident troubleshooting",
        "ServiceNow",
        "Remote support",
        "Asset lifecycle",
        "Vendor coordination",
        "IT procurement",
        "CAPEX planning",
        "Mentoring",
      ],
    },
    {
      key: "documentation",
      title: "Documentation & Delivery",
      items: [
        "SOP development",
        "Infrastructure documentation",
        "User guides",
        "Technical writing",
        "Workload prioritisation",
        "Project coordination",
      ],
    },
  ],

  experience: [
    {
      company: "LWK and Partners (HK) Limited",
      location: "Makati City",
      role: "IT Administrator",
      period: "Aug 2022 — Present",
      current: true,
      summary:
        "Owns day-to-day infrastructure and end-user operations for a mid-sized architecture practice, including a 54-workstation environment and a linked regional office.",
      highlights: [
        "Designed and deployed VLAN segmentation across FortiGate firewalls and managed switches.",
        "Built a multi-layer backup and recovery environment using Hyper-V, TrueNAS, Veeam and Windows Server Backup.",
        "Ran restore testing and replication validation, and authored the DR and business continuity documentation.",
        "Delivered an office expansion end to end — structured cabling, switch configuration, patching and connectivity testing.",
        "Administers Microsoft 365, asset lifecycle, software licensing and CAPEX planning.",
        "Mentors an IT Assistant Administrator and sets daily workload priorities.",
      ],
    },
    {
      company: "HCL Technologies Philippines Inc.",
      location: "Taguig City",
      role: "Global Service Desk — Senior Analyst",
      period: "Mar 2022 — Aug 2022",
      summary:
        "Escalation point for Active Directory and enterprise application incidents across a global service desk.",
      highlights: [
        "Acted as primary escalation point for Active Directory and enterprise application issues.",
        "Owned technical tickets end to end in ServiceNow and coordinated with subject matter experts.",
        "Coached analysts on escalation pathways and troubleshooting approach.",
      ],
    },
    {
      company: "HCL Technologies Philippines Inc.",
      location: "Taguig City",
      role: "Global Service Desk — Analyst",
      period: "Mar 2021 — Mar 2022",
      summary:
        "First-line support for hardware, software and remote connectivity in a global environment.",
      highlights: [
        "Resolved incidents through ServiceNow following established escalation procedures.",
        "Handled Active Directory password resets and access provisioning.",
        "Diagnosed end-user device and remote connectivity issues.",
      ],
    },
    {
      company: "ELM Software Maintenance Service",
      location: "Makati City",
      role: "IT Technical Support Officer",
      period: "Jan 2015 — Mar 2021",
      summary:
        "Remote application support for proprietary veterinary software used by more than 50 clinics across four countries.",
      highlights: [
        "Supported clinics in Hong Kong, Australia, the Philippines and Barbados remotely.",
        "Worked with developers on recurring defects and relayed structured client feedback.",
        "Authored technical documentation, user manuals and procedural guides.",
        "Maintained internal office IT infrastructure and workstations.",
      ],
    },
    {
      company: "Manuel S. Enverga University Foundation — Candelaria, Inc.",
      location: "Candelaria, Quezon",
      role: "IT Staff",
      period: "Jun 2008 — Jan 2015",
      summary:
        "Administered academic data systems and departmental database platforms.",
      highlights: [
        "Managed enrolment, grading and departmental database systems used by administrative offices.",
        "Built database-driven reporting tools for administrative workflows.",
        "Provided day-to-day systems and access support across departments.",
      ],
    },
    {
      company: "Manuel S. Enverga University Foundation — Candelaria, Inc.",
      location: "Candelaria, Quezon",
      role: "Part-Time College Instructor",
      period: "Jun 2013 — Oct 2013",
      summary:
        "Taught Computer Science on a part-time basis alongside the IT Staff role.",
      highlights: [
        "Delivered Computer Science education by conducting lectures, structured discussions, and evaluating student academic performance.",
      ],
    },
  ],

  education: {
    qualification: "Bachelor of Science in Computer Science",
    institution: "Manuel S. Enverga University Foundation — Candelaria, Inc.",
    location: "Candelaria, Quezon",
  },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Résumé" },
];
