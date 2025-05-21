module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  name   = "mt-vpc"
  cidr   = var.vpc_cidr
  azs    = var.azs
  public_subnets  = var.public_subnets
  private_subnets = var.private_subnets

  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "mt-vpc"
  }
}

module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = var.cluster_name
  cluster_version = "1.29"
  subnets         = module.vpc.private_subnets
  vpc_id          = module.vpc.vpc_id

  enable_irsa = true

  node_groups = {
    default = {
      desired_capacity = 2
      max_capacity     = 2
      min_capacity     = 1

      instance_types = ["t3.medium"]
      disk_size      = 20
    }
  }

  tags = {
    Environment = "dev"
    Project     = "mt"
  }
}
