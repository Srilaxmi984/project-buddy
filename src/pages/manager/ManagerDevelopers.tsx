import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { MOCK_USERS } from "@/contexts/AuthContext";
import { Plus, Mail, Phone } from "lucide-react";

export default function ManagerDevelopers() {
  const devs = MOCK_USERS.filter(u => u.role === "DEVELOPER");
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <PageHeader title="Developers" description="Manage developer accounts">
        <Button onClick={() => setShowModal(true)} size="sm"><Plus className="w-4 h-4 mr-1" /> Create Developer</Button>
      </PageHeader>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {devs.map(dev => (
          <div key={dev.id} className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-lg font-bold text-success">
                {dev.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{dev.name}</h3>
                <span className="bg-success/10 text-success text-[10px] font-semibold px-2 py-0.5 rounded-full">DEVELOPER</span>
              </div>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" />{dev.email}</div>
              {dev.phone && <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" />{dev.phone}</div>}
            </div>
            <p className="text-xs text-muted-foreground mt-3">Joined {dev.createdAt}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-lg" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Create Developer Account</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                <input type="text" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input type="email" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                <input type="password" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                <input type="tel" className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button size="sm" onClick={() => setShowModal(false)}>Create Developer</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
