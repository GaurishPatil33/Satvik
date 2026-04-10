import { useState, useEffect } from "react";
import { deleteMyAccount, getMyProfile, updateMyProfile } from "../services/user.services";
import { IUser } from "../types/user-types";

export const useUser = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getMyProfile();
            setUser(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (data: Partial<IUser>) => {
        setLoading(true);
        setError(null);

        try {
            const updated = await updateMyProfile(data);
            return updated;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteAccount = async () => {
        setLoading(true);

        try {
            await deleteMyAccount();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return { user, loading, error, refetch: fetchProfile, updateProfile, deleteAccount };
}