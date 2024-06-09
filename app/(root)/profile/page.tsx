
import { auth, UserButton, UserProfile } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Collection } from "@/components/shared/Collection";
import FormHeader from "@/components/shared/FormHeader";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Profile = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user._id });

  return (
    <>
      <FormHeader title="Profile" />

      <section className="profile">
        <div className="profile-balance">
          <p className="p-14-medium md:p-16-medium">CREDITS AVAILABLE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{user.creditBalance}</h2>
          </div>
        </div>
        

        <div className="profile-image-manipulation">
          <p className="p-14-medium md:p-16-medium">IMAGE MANIPULATION DONE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/photo.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="h2-bold text-dark-600">{images?.data.length}</h2>
          </div>
        </div>
      </section>


      <div className="flex items-center justify-center relative w-full group mt-6 ">
            <div className="flex mr-auto ml-auto absolute -inset-0.5 bg-gradient-to-r from-indigo-900 to-red-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt max-w-xl"></div>
            <Button 
              type="submit"
              className="flex justify-center h-min submit-button capitalize group-hover:text-red-100 transition max-w-xl duration-1000"
            >
              <Link className="flex justify-center m-2 text-xl" href="credits">
                Buy Credits
              </Link>
            </Button>
          </div>

                        
      <div className="flex flex-col mt-4 mb-10">
        <h3 className="justify-center h2-bold text-dark-600 mb-8 mt-10">Clerk Profile</h3>
        <UserButton afterSignOutUrl="/" showName/> 
      </div>

      <section className="mt-8 md:mt-14">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default Profile;