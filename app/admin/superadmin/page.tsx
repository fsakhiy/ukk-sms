"use server"

import prisma from '@/components/db/prisma'
import {getServerSession} from "next-auth";
import {DataTableWSearch} from "@/components/web-component/DataTableWSearch";
import {AdminAccountType, columns} from "@/app/admin/superadmin/columns";
import {deleteAdmin} from "@/app/admin/superadmin/actions";

export default async function SuperAdminPage() {
    const userData = await getServerSession()
    const userDataFromDB = await prisma.user.findUnique({
        where: {
            username: userData?.user?.name ?? ''
        }
    })

    if(userDataFromDB?.isSuperAdmin) {
        const allAdmin = await prisma.user.findMany({
            where: {
                isAdmin: true
            }
        })
        const adminData: AdminAccountType[] =[]

        allAdmin.map((account) => {
            adminData.push({
                id: account.id,
                username: account.username,
                isSuperAdmin: account.isSuperAdmin ? 'Ya' : 'Tidak'
            })
        })


        return (
            <div className={'flex flex-col p-10'}>
                <h1 className={'font-bold text-3xl'}>List Akun Admin</h1>
                <div className={''}>
                    {/*<p>List Akun Admin</p>*/}
                    <DataTableWSearch columns={columns} data={adminData} handler={deleteAdmin} searchKey={'username'} searchPlaceholder={'Cari pengguna...'} />
                </div>
            </div>
        )
    } else {
        return (
            <div className={'p-10'}>
                <h1 className={'font-bold text-3xl'}>Kamu tidak dapat mengakses halaman ini</h1>


            </div>
        )
    }
}