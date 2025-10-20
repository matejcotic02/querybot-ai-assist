export const LogoCarousel = () => {
  // Logo data - using public CDN URLs for company logos
  const logos = [
    { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Google Workspace", url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Workspace_Logo.svg" },
    { name: "Slack", url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
    { name: "Zendesk", url: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Zendesk_logo.svg" },
    { name: "ServiceNow", url: "https://upload.wikimedia.org/wikipedia/commons/5/57/ServiceNow_logo.svg" },
    { name: "Atlassian", url: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Atlassian_2014_logo.svg" },
    { name: "Salesforce", url: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
    { name: "HubSpot", url: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg" },
  ];

  return (
    <div className="relative w-full overflow-hidden py-12">
      {/* Gradient fade masks on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      {/* Scrolling container */}
      <div className="flex animate-scroll-left">
        {/* First set of logos */}
        {logos.map((logo, index) => (
          <div
            key={`first-${index}`}
            className="flex-shrink-0 mx-8 w-32 h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <img
              src={logo.url}
              alt={`${logo.name} logo`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
        {/* Duplicate set for seamless infinite loop */}
        {logos.map((logo, index) => (
          <div
            key={`second-${index}`}
            className="flex-shrink-0 mx-8 w-32 h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <img
              src={logo.url}
              alt={`${logo.name} logo`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
