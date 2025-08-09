import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface GroupChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (name: string, userIds: string[]) => void;
  allUsers: { id: string; name: string }[];
}

export function GroupChatModal({ open, onOpenChange, onCreate, allUsers }: GroupChatModalProps) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleToggleUser = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onCreate(name, selected);
    setLoading(false);
    setName("");
    setSelected([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Group Chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Group name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <div className="max-h-40 overflow-y-auto space-y-1">
            {allUsers.map(user => (
              <label key={user.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(user.id)}
                  onChange={() => handleToggleUser(user.id)}
                  className="accent-green-500"
                />
                <span>{user.name}</span>
              </label>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading || !name || selected.length === 0}>
              {loading ? "Creating..." : "Create Group"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
