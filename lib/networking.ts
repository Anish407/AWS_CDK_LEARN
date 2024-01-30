import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { Construct } from 'constructs';
interface NetworkingProps{
    maxAzs: number
}

export class Networking extends Construct{
    public readonly vpc: ec2.IVpc
    constructor(scope: Construct, id: string, _props: NetworkingProps){
        super(scope,id);

        this.vpc= new ec2.Vpc(this, "MyVPC",{

            cidr: '10.0.0.0/16',
            maxAzs: _props.maxAzs,
            subnetConfiguration:[
                {
                    subnetType: ec2.SubnetType.PUBLIC,
                    name:"myPublicSubnet",
                    cidrMask:24
                },
                {
                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
                    name:"myPrivateSubnet",
                    cidrMask:24
                }
            ]
        })
    }
}