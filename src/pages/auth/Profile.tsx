import { FC } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar01Icon,
  Mail01Icon,
  PhoneOff01Icon,
  UserCircleIcon,
} from "hugeicons-react";
import { useProfile } from "@/hooks";
import useAuthStore from "@/store/authStore";
import moment from "moment";

export const Profile: FC = () => {
  const { user } = useAuthStore();
  const { data: profile } = useProfile(Number(user?.id));
  console.log(profile);

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">User Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4 space-x-4">
              <UserCircleIcon className="w-10 h-10 text-primary" />
              <div>
                <p className="text-xl font-semibold">{`${profile?.name} ${profile?.lastname}`}</p>
                {/* <p className="text-sm text-muted-foreground">
                  ID: {profile?.id}
                </p> */}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail01Icon className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>{profile?.email}</span>
              </div>
              <div className="flex items-center">
                <PhoneOff01Icon className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>{profile?.phone || "N/A"}</span>
              </div>
              <div className="flex items-center">
                <Calendar01Icon className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>Age: {profile?.age}</span>
              </div>
              <div className="flex items-center">
                <Calendar01Icon className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>DNI: {profile?.dni}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Username</TableCell>
                  <TableCell>{profile?.username}</TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell className="font-medium">DNI</TableCell>
                  <TableCell>{profile?.dni}</TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell className="font-medium">Role</TableCell>
                  <TableCell>{profile?.role?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Area</TableCell>
                  <TableCell>{profile?.area?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Status</TableCell>
                  <TableCell>
                    <Badge
                      variant={profile?.status ? "default" : "destructive"}
                    >
                      {profile?.status ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* <TableRow>
                <TableCell>Account Created</TableCell>
                <TableCell>
                  {new Date(profile?.createdAt ?? "").toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Last Updated</TableCell>
                <TableCell>
                  {new Date(profile?.updatedAt ?? "").toLocaleString()}
                </TableCell>
              </TableRow> */}
              {profile?.log?.map((log) => {
                return (
                  <TableRow>
                    <TableCell>{log.description}</TableCell>
                    <TableCell>
                      {moment(log.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
