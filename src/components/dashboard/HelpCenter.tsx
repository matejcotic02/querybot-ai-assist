import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Monitor, Wifi, Lock, Mail, HardDrive, AlertCircle, BookOpen, MessageCircle } from "lucide-react";

const categories = [
  {
    id: "hardware",
    title: "Hardware Issues",
    icon: Monitor,
    color: "bg-blue-500",
    articles: [
      {
        question: "My computer won't turn on",
        answer: "First, check if the power cable is properly connected. Verify the power outlet is working by plugging in another device. If using a laptop, ensure the battery is charged. Press and hold the power button for 10 seconds, then try turning it on again. If the issue persists, contact IT support."
      },
      {
        question: "Printer is not responding",
        answer: "Check if the printer is powered on and connected to the network. Verify the printer queue isn't stuck with pending jobs - go to Settings > Devices > Printers & Scanners, select your printer, and clear the queue. Restart both your computer and the printer. Ensure you have the latest printer drivers installed."
      },
      {
        question: "External monitor not detected",
        answer: "Check cable connections at both ends. Try a different cable or port if available. Press Windows + P to access display settings and select 'Extend' or 'Duplicate'. Update your graphics drivers. If using a docking station, try connecting directly to your laptop."
      }
    ]
  },
  {
    id: "network",
    title: "Network & Connectivity",
    icon: Wifi,
    color: "bg-green-500",
    articles: [
      {
        question: "Cannot connect to Wi-Fi",
        answer: "Toggle Wi-Fi off and on. Restart your device. Forget the network and reconnect by entering the password again. Check if airplane mode is disabled. Ensure you're within range of the access point. If others can connect but you can't, restart your network adapter in Device Manager."
      },
      {
        question: "VPN connection fails",
        answer: "Verify you're using the correct VPN credentials. Check your internet connection first. Ensure the VPN client is up to date. Try disconnecting and reconnecting. Clear VPN cache if available. If using two-factor authentication, ensure your token is current. Contact IT if the issue persists."
      },
      {
        question: "Slow internet connection",
        answer: "Run a speed test to confirm the issue. Close unnecessary applications and browser tabs. Restart your router/modem. Move closer to the Wi-Fi access point if wireless. Check for bandwidth-heavy activities like large downloads. Scan for malware. Contact IT if speeds are consistently below expected levels."
      }
    ]
  },
  {
    id: "software",
    title: "Software & Applications",
    icon: HardDrive,
    color: "bg-purple-500",
    articles: [
      {
        question: "Application keeps crashing",
        answer: "Save your work and restart the application. Check for software updates. Clear application cache and temporary files. Restart your computer. Ensure your system meets the minimum requirements. Try reinstalling the application. Check if antivirus is blocking it. Document the error message and contact IT support."
      },
      {
        question: "Cannot install software",
        answer: "Verify you have admin rights - many installations require administrator privileges. Check available disk space (at least 10GB free recommended). Disable antivirus temporarily during installation. Download from official sources only. Run the installer as administrator. Contact IT if you need elevated permissions."
      },
      {
        question: "Software license activation issues",
        answer: "Verify you're using the correct license key. Check your internet connection. Ensure the license hasn't expired or reached its activation limit. Try deactivating and reactivating the license. Contact your IT administrator for a valid license key if needed."
      }
    ]
  },
  {
    id: "account",
    title: "Account & Access",
    icon: Lock,
    color: "bg-red-500",
    articles: [
      {
        question: "Forgot my password",
        answer: "Use the 'Forgot Password' link on the login page. Check your email for the password reset link. Follow the instructions to create a new password. Ensure your new password meets the security requirements (minimum 8 characters, uppercase, lowercase, number, special character). Contact IT support if you don't receive the reset email."
      },
      {
        question: "Account is locked",
        answer: "Accounts are typically locked after multiple failed login attempts for security. Wait 30 minutes and try again, or contact IT support immediately for an unlock. Ensure Caps Lock is off when entering your password. Reset your password if you've forgotten it."
      },
      {
        question: "Cannot access shared drive",
        answer: "Verify you have the correct permissions. Check if you're connected to the corporate network or VPN. Map the network drive manually using the UNC path (\\\\server\\share). Ensure your credentials are correct. Contact IT to verify your access permissions."
      }
    ]
  },
  {
    id: "email",
    title: "Email & Communication",
    icon: Mail,
    color: "bg-orange-500",
    articles: [
      {
        question: "Not receiving emails",
        answer: "Check your spam/junk folder. Verify your mailbox isn't full (check storage quota). Ensure email forwarding rules aren't redirecting messages. Check if the sender was blocked. Look in the Deleted Items folder. Verify your email filters. Contact IT if you suspect a server issue."
      },
      {
        question: "Cannot send emails",
        answer: "Check your internet connection. Verify the recipient's email address is correct. Check if your mailbox has exceeded the sending limit. Remove large attachments (typically limit is 25MB). Ensure you're not marked as spam by the recipient's server. Check Outbox for stuck messages."
      },
      {
        question: "Email signature not appearing",
        answer: "Go to email settings/options and locate Signature settings. Ensure the signature is set as default for new messages and replies. Check if you have multiple signatures and the correct one is selected. Clear your email cache. Re-create the signature if needed."
      }
    ]
  },
  {
    id: "security",
    title: "Security & Privacy",
    icon: AlertCircle,
    color: "bg-yellow-500",
    articles: [
      {
        question: "Suspicious email or phishing attempt",
        answer: "Do NOT click any links or download attachments. Do not reply or provide any information. Report the email to IT security immediately. Delete the email after reporting. Never enter credentials on suspicious websites. Verify sender authenticity through a separate communication channel."
      },
      {
        question: "Suspected malware or virus",
        answer: "Disconnect from the network immediately. Do not shut down your computer - this may destroy evidence. Run a full antivirus scan if safe to do so. Document any unusual behavior or error messages. Contact IT security immediately. Do not use USB drives or external devices until cleared."
      },
      {
        question: "Setting up two-factor authentication",
        answer: "Download an authenticator app (Microsoft Authenticator, Google Authenticator). Log into your account and navigate to Security Settings. Select 'Set up two-factor authentication'. Scan the QR code with your authenticator app. Enter the verification code to confirm setup. Save backup codes in a secure location."
      }
    ]
  }
];

export const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => 
    selectedCategory ? category.id === selectedCategory : category.articles.length > 0
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Help Center</h1>
        <p className="text-muted-foreground">Find answers to common IT support questions and troubleshooting guides</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          All Topics
        </Button>
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              <Icon className="h-4 w-4 mr-2" />
              {category.title}
            </Button>
          );
        })}
      </div>

      {/* Help Articles */}
      <div className="grid grid-cols-1 gap-6">
        {filteredCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`${category.color} p-2 rounded-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.articles.length} articles</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.articles.map((article, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-medium">{article.question}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground leading-relaxed">{article.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Contact Support */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Still Need Help?
          </CardTitle>
          <CardDescription>
            Can't find what you're looking for? Our IT support team is here to help.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Email Support
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Live Chat
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Response time: Usually within 2-4 hours during business hours (Mon-Fri, 9AM-5PM)
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
