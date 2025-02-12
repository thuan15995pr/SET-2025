import java.rmi.*;

public interface Hello extends Remote {
    public void printMsg(String msg) throws RemoteException;
}